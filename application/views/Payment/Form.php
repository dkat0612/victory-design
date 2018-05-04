<html>
<head>
    <meta charset="utf-8" />
</head>
<body>
    <form action="https://epay.kkb.kz/jsp/process/logon.jsp" method="post">

        <input type="email" value="" name="email" />


        <button type="submit">Submit</button>

        <input type="hidden" name="template" value="default.xsl" />
        <input type="hidden" value="http://<?=$site?>/payment/postlink" name="PostLink" />
        <input type="hidden" value="http://<?=$site?>/payment/failurepostlink" name="FailurePostLink" />
        <input type="hidden" value="http://<?=$site?>/payment/success/<?=$order_id?>" name="BackLink" />
        <input type="hidden" value="http://<?=$site?>/payment/fail/<?=$order_id?>" name="FailureBackLink" />
        <input type="hidden" name="Language" value="rus" />
        <input type="hidden" value="<?=$signed_order?>" name="Signed_Order_B64" />
    </form>
</body>
</html>