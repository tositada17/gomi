import * as vs from "vscode";

/*
プログラム実行のトレース
- デバッグを有効にします。
*/

export enum TraceLevel {
  Off,
  Error,
  Warning,
  Info,
  Verbose,
}

// output terminal
function isDebugging(): boolean {
  const args = process.execArgv;
  // debug console || debugging comandline
  return args && args.some((arg) => arg.startsWith("--inspect"));
}

export class Tracer {
  private static _output: vs.OutputChannel;
  private static _level: TraceLevel = TraceLevel.Off;
  private static _debugging = isDebugging();


  static set level(value: string) {
    if (value === "error") {
      this._level = TraceLevel.Error;
    } else if (value === "warning") {
      this._level = TraceLevel.Warning;
    } else if (value === "info") {
      this._level = TraceLevel.Info;
    } else if (value === "verbose") {
      this._level = TraceLevel.Verbose;
    } else {
      this._level = TraceLevel.Off;
    }
  }

  //write log stream
  static verbose(message: string) {
    this._log(message, TraceLevel.Verbose);
  }

  static info(message: string) {
    this._log(message, TraceLevel.Info);
  }

  static warnig(message: string) {
    this._log(message, TraceLevel.Warning);
  }

  static error(message: string) {
    this._log(message, TraceLevel.Error);
  }

  private static createOutputChanel(): vs.OutputChannel {
    if (!this._output) {
      this._output = vs.window.createOutputChannel("Gomi");
    }
    return this._output;
  }

  private static timestamp(): string {
    return new Date().toISOString().replace("T", " ").substring(0, 19);
  }

  private static _log(message: string, level: TraceLevel) {
    if (this._level >= level) {
      message = `[${this.timestamp()}][${TraceLevel[level]}] ${message}`;

      // output terminal
      if (this._debugging) {
        console.log("extention: [gomi] ", message);
      }

      if (this._output === undefined) {
        this.createOutputChanel();
      }

      this._output.appendLine(message);
    }
  }
}
