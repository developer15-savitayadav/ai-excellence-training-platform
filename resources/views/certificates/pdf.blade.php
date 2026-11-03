<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    @page { margin: 0; }
    body { margin: 0; font-family: 'DejaVu Sans', sans-serif; color: #23231e; }
    .outer { position: absolute; top: 20px; left: 20px; right: 20px; bottom: 20px; border: 3px solid #982cdc; }
    .inner { position: absolute; top: 30px; left: 30px; right: 30px; bottom: 30px; border: 1px solid #eec369; text-align: center; }
    .brand { margin-top: 34px; font-size: 15px; letter-spacing: 3px; text-transform: uppercase; color: #982cdc; }
    .title { margin-top: 18px; font-family: 'DejaVu Serif', serif; font-size: 34px; }
    .small { margin-top: 20px; font-size: 12px; color: #73726a; }
    .name { margin-top: 10px; font-family: 'DejaVu Serif', serif; font-size: 30px; color: #982cdc; }
    .course { margin-top: 8px; font-family: 'DejaVu Serif', serif; font-size: 22px; }
    .meta { margin-top: 22px; font-size: 12px; color: #444; }
    .foot { position: absolute; left: 40px; right: 40px; bottom: 28px; width: 92%; }
    .foot td { vertical-align: bottom; font-size: 10px; color: #73726a; }
    .sig-line { border-top: 1px solid #999; width: 180px; margin: 0 auto 4px; }
    .code { font-size: 11px; color: #23231e; font-weight: bold; }
</style>
</head>
<body>
<div class="outer"></div>
<div class="inner">
    <div class="brand">{{ $issuer }}</div>
    <div class="title">Certificate of Completion</div>
    <div class="small">This is to certify that</div>
    <div class="name">{{ $c->student_name }}</div>
    <div class="small">has successfully completed</div>
    <div class="course">{{ $c->course_title }}</div>

    <div class="meta">
        Issued on {{ $c->issued_at->format('d F Y') }}
        @if($c->duration) &nbsp;|&nbsp; Duration: {{ $c->duration }} @endif
        @if($c->score !== null) &nbsp;|&nbsp; Score: {{ $c->score }}% @endif
        @if($c->grade) &nbsp;|&nbsp; Grade: {{ $c->grade }} @endif
    </div>

    <table class="foot">
        <tr>
            <td style="width: 28%; text-align: left;">
                <img src="{{ $qr }}" width="90" height="90"><br>
                Scan to verify
            </td>
            <td style="width: 36%; text-align: center;">
                @if($c->instructor_name)
                    <div class="sig-line"></div>
                    {{ $c->instructor_name }}<br>Instructor
                @endif
            </td>
            <td style="width: 36%; text-align: right;">
                <span class="code">{{ $c->code }}</span><br>
                {{ $url }}
            </td>
        </tr>
    </table>
</div>
</body>
</html>
