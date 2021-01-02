@JS()
library barcode_scanner_imp;

import "package:js/js.dart";
import "package:js/js_util.dart" show promiseToFuture;

/*type BarcodeFormats =
  'code_39' |
  'code_128' |
  'data_matrix' |
  'ean_8' |
  'ean_13' |  
  'itf' |
  'pdf417' |
  'qr_code' |
  'rss_14'
*/
@anonymous
@JS()
abstract class BarcodeScannerOptions {
  external bool get beep;
  external set beep(bool v);
  external List<
      String /*'code_39'|'code_128'|'data_matrix'|'ean_8'|'ean_13'|'itf'|'pdf417'|'qr_code'|'rss_14'*/ > /*Tuple of <'code_39'|'code_128'|'data_matrix'|'ean_8'|'ean_13'|'itf'|'pdf417'|'qr_code'|'rss_14'>*/ get formats;
  external set formats(
      List<
          String /*'code_39'|'code_128'|'data_matrix'|'ean_8'|'ean_13'|'itf'|'pdf417'|'qr_code'|'rss_14'*/ > /*Tuple of <'code_39'|'code_128'|'data_matrix'|'ean_8'|'ean_13'|'itf'|'pdf417'|'qr_code'|'rss_14'>*/ v);
  external factory BarcodeScannerOptions(
      {bool? beep,
      List<
          String /*'code_39'|'code_128'|'data_matrix'|'ean_8'|'ean_13'|'itf'|'pdf417'|'qr_code'|'rss_14'*/ >? /*Tuple of <'code_39'|'code_128'|'data_matrix'|'ean_8'|'ean_13'|'itf'|'pdf417'|'qr_code'|'rss_14'>*/ formats});
}

@JS()
class BarcodeScanner {
  // @Ignore
  //BarcodeScanner.fakeConstructor$();
  external BarcodeScannerOptions get options;
  external set options(BarcodeScannerOptions v);
  external dynamic get scanner;
  external set scanner(dynamic v);
  external dynamic get video;
  external set video(dynamic v);
  external dynamic get redLine;
  external set redLine(dynamic v);
  external dynamic get closeButton;
  external set closeButton(dynamic v);
  external dynamic get codeReader;
  external set codeReader(dynamic v);
  external factory BarcodeScanner([BarcodeScannerOptions? options]);
  external cancel();
  external show();
  external hide();
  external beep();
}

@JS("BarcodeScanner")
abstract class _BarcodeScanner {
  external Promise<String> scan();
}

extension BarcodeScannerExtensions on BarcodeScanner {
  Future<String> scan() {
    final Object t = this;
    final _BarcodeScanner tt = t as _BarcodeScanner;
    return promiseToFuture(tt.scan());
  }
}

@JS()
abstract class Promise<T> {
  external factory Promise(
      void executor(void resolve(T result), Function reject));
  external Promise then(void onFulfilled(T result), [Function? onRejected]);
}
