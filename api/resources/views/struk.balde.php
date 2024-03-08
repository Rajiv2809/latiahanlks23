<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .strukid{
            padding-left: 20px
        }
        .container{
            padding: 20px;
            font-family: Arial, Helvetica, sans-serif;
        }
        .border{
            padding: 10px;
            width: 100%;
            text-align: center;
        }

        .border-box{
            border: 1px solid #d2d2d2;
            padding: 5px;
        }
    </style>
</head>
<body>
    <div>
        <h1>Kantin Sekolah</h1>
        <p>Pelayanan kantin sekolah pusat berbasis tenant</p>
    </div>
    <div class="container">
        <h5 class="strukid">ID STRUK: {{ $penjualan->IDTrans }}</h5>
        <table class="border">
            <thead>
                <tr >
                    <th class="border-box">Nama Produk</th>
                    <th class="border-box">Tanggal</th>
                    <th class="border-box">Qty</th>
                    <th class="border-box">Harga Jual</th>
                    <th class="border-box">Total</th>
                    <th class="border-box">Kembali</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border-box">{{ $penjualan->produk->nama }}</td>
                    <td class="border-box">{{ $penjualan->tanggal }}</td>
                    <td class="border-box">{{ $penjualan->qty }}</td>
                    <td class="border-box">{{ $penjualan->hargajual }}</td>
                    <td class="border-box">{{ $penjualan->total }}</td>
                    <td class="border-box">{{ $penjualan->kembali }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>