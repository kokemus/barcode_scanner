# barcode_scanner

A barcode scanner for web. It provides simple Dart API for [zxing-js](https://github.com/zxing-js/library).

## Usage

```
dependencies:
  barcode_scanner:
    git:
      url: git://github.com/kokemus/barcode_scanner.git

```

### Example

``` dart
import 'package:barcode_scanner/barcode_scanner.dart';

BarcodeScanner scanner = await BarcodeScannerFactory.create(BarcodeScannerOptions(formats: ['ean_13', 'qr_code']));
final code = await scanner.scan();
```
