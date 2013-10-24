//validate form
function validateForm()
{
    var x=document.forms["message"]["Name"].value;
    var y=document.forms["message"]["Email"].value;
    var atpos=y.indexOf("@");
    var dotpos=y.lastIndexOf(".");
    
    if (x==null || x=="")
      {
          document.getElementById("name_valid").innerHTML="Please enter your name";
          return false;
      }
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=y.length)
      {
          document.getElementById("email_valid").innerHTML="Not a valid e-mail address";
          return false;
      }
}