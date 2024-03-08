<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        .box{
            border: 1px solid #d2d2d2d2;
            padding: 5px;
        }
        .flex{
            display: flex;
            justify-content: end;
            align-items: center;
        }
        .center{
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="center">
        <h3>Kwitansi</h3>
    </div>
    <table class="center">
        <thead>
            <tr>
                <th class="box">ID</th>
                <th class="box">Tanggal</th>
                <th class="box">Nama Tenant</th>
                <th class="box">Total Pendapatan</th>
                <th class="box">Setoran Pendapatan</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="box">{{ $pendapatan->IDpendapatan }}</td>
                <td class="box">{{ $pendapatan->tanggal }}</td>
                <td class="box">{{ $pendapatan->tenant->namatenant }}</td>
                <td class="box">{{ $pendapatan->totalPendapatan }}</td>
                <td class="box">{{ $pendapatan->setoranTenant }}</td>
            </tr>
        </tbody>
    </table>

    <div class="flex">
        <div>
        <p><strong>Diterima oleh</strong></p>
        <br>
        <br>
        <br>
        <p>..........................</p>
        </div>
    </div>
</body>
</html>