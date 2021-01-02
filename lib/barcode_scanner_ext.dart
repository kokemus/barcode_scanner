import 'package:barcode_scanner/barcode_scanner.dart';

import 'dart:async';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html';

/// Factory class to create [BarcodeScanner] instance.
class BarcodeScannerFactory {
  /// Creates a [BarcodeScanner] with [options].
  static Future<BarcodeScanner> create(BarcodeScannerOptions options) async {
    await loadScript();
    return BarcodeScanner(options);
  }

  /// Loads BarcodeScanner script.
  static Future loadScript() {
    return _loadScript('assets/packages/barcode_scanner/barcode_scanner.js');
  }

  /// Loads script defined by url.
  static Future _loadScript(String url) async {
    Completer c = new Completer();
    final script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    document.querySelector('head')!.append(script);
    script.setAttribute('src', url);
    script.addEventListener('load', (event) => c.complete());
    return c.future;
  }
}
