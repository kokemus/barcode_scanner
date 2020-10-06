import 'package:flutter/material.dart';
import 'package:async/async.dart';
import 'package:barcode_scanner/barcode_scanner.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Barcode Scanner Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _code = "";
  BarcodeScanner scanner;

  @override
  Future<void> initState() async {
    this.scanner = await BarcodeScannerFactory.create(BarcodeScannerOptions(formats: ['ean_13', 'qr_code']));
    super.initState();
  }

  void _scan() async {
    setState(() {
      _code = '';
    });
    final operation = CancelableOperation<String>.fromFuture(
      scanner.scan(), onCancel: () => scanner.cancel()
    );
    operation.value.then((value) => setState(() {
      _code = value;
    }));
    Future.delayed(Duration(seconds: 15), () {
        operation.cancel();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Barcode Scanner Demo"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '$_code',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _scan,
        tooltip: 'Scan barcode',
        child: Icon(Icons.camera),
      ), 
    );
  }
}
