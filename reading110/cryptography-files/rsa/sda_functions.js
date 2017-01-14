function fb_log(string) {
    try {
        console.log(string);
    }
    catch (e) {}
}

// ================================================================

var KeysGenerated = false;

function unpackPublicKey()
{
 var mod=new Array();
 var exp=new Array();
 
 var s = r2s(document.t.pkey.value);
 var l = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);

 mod = mpi2b(s.substr(0,l+2));
 exp = mpi2b(s.substr(l+2));

 document.t.pq.value = mod;
 document.t.e.value = exp;
 KeysGenerated = true;
}


var keybits = [128,256,384,512];


function genkey()
{
 document.t.p.value=
 document.t.q.value=
 document.t.d.value=
 document.t.e.value=
 document.t.u.value=
 document.t.pq.value=
 document.t.pkey.value=
 document.t.howLong.value='';

 var ix = document.t.keylen.selectedIndex;

 var bits=document.t.keylen.value;  // keybits[ix];

 var startTime=new Date();

 // alert("generating a product of roughly "+bits+" bit primes");
 rsaKeys(bits);
 document.t.p.value=s2hex(b2s(rsa_p));
 document.t.p_len.value=document.t.p.value.length*4;
 document.t.q.value=s2hex(b2s(rsa_q));
 document.t.q_len.value=document.t.q.value.length*4;
 document.t.d.value=rsa_d;
 document.t.e.value=rsa_e;
 document.t.u.value=rsa_u;
 document.t.pq.value=s2hex(b2s(rsa_pq));
 document.t.pq_len.value=document.t.pq.value.length*4;

 var mpi=s2r(b2mpi(rsa_pq)+b2mpi(rsa_e));
 mpi=mpi.replace(/\n/,'');
 document.t.pkey.value=mpi;
 
 var endTime=new Date();
 document.t.howLong.value=(endTime.getTime()-startTime.getTime())/1000.0;
 KeysGenerated = true;
}

function RSAdoEncryption()
{
 if( ! KeysGenerated ) {
    alert("Please generate keys first.");
 }
 var mod=new Array();
 var exp=new Array();
 
 var s = r2s(document.t.pkey.value);
 var l = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);

 mod = mpi2b(s.substr(0,l+2));
 exp = mpi2b(s.substr(l+2));

 var p = document.rsatest.plaintext.value+String.fromCharCode(1);
 var pl = p.length;

/*
 if(pl > l-3)
 {
    alert('In this example plain text length must be less than modulus of '+(l-3)+' bytes');
    return;
 }
*/

 var b=s2b(p);

 var t;
 var i;

 fb_log("original encryption using mod of "+s2hex(b2s(mod))+"(16) and exp of "+s2hex(b2s(exp))+"(16)");
 var startTime=new Date();
 fb_log("invoking RSAencrypt with "+b+","+exp+","+mod);
 var enc=RSAencrypt(b,exp,mod);
 fb_log("original enc_b: "+enc);
 var endTime=new Date();

 document.rsatest.ciphertext.value=s2hex(b2s(enc));
 document.rsatest.howLong.value=(endTime.getTime()-startTime.getTime())/1000.0;
}

function RSAdoDecryption()
{
  var p = rsa_p;
  var q = rsa_q;
  var d = rsa_d;
  var u = rsa_u;
  var enc=s2b(hex2s(document.rsatest.ciphertext.value));

  var startTime=new Date();
  var dec=b2s(RSAdecrypt(enc, d, p, q, u));
  var endTime=new Date();

  document.rsatest.plaintext.value=dec.substr(0, dec.length-1);

  document.rsatest.howLong.value=(endTime.getTime()-startTime.getTime())/1000.0;
}

// ================================================================

/* My version (Scott D. Anderson), which allows an input string that is
 * hex-encoded instead of ASCII plaintext.  This allows us to check a
 * digitally signed digest by encrypting the hex-encoded signature. */

function RSAdoEncryption_sda()
{
 if( ! KeysGenerated ) {
    alert("Please generate keys first.");
 }
 var mod=new Array();
 var exp=new Array();
 
 var s = r2s(document.t.pkey.value);
 var l = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);

 mod = mpi2b(s.substr(0,l+2));
 exp = mpi2b(s.substr(l+2));

 var p = hex2s(document.sign.dec_digest.value);
 var pl = p.length;
 // alert("length of input is "+document.sign.dec_digest.value.length+" and string has length "+pl);

 var b=s2b(p);

 var t;
 var i;

 // alert("Encrypting using mod of "+s2hex(b2s(mod)));
 var startTime=new Date();
 var enc=RSAencrypt(b,exp,mod);
 var endTime=new Date();

 document.sign.enc_dec_digest.value=s2hex(b2s(enc));
 document.sign.howLong_enc.value=(endTime.getTime()-startTime.getTime())/1000.0;
}

/* My version applies the RSA description algorithm to the hex-encoded
value in "digest", writing the result, also hex-encoded into "dec_digest"
and putting the amount of time into "howLong_dec".  This really should be
combined with the preceding function and re-factored.  */

function RSAdoDecryption_sda()
{
  if( ! KeysGenerated ) {
     alert("Please generate keys first.");
  }
  var in_b=s2b(hex2s(document.sign.digest.value));

  var startTime=new Date();
  var val = RSAdecrypt(in_b, rsa_d, rsa_p, rsa_q, rsa_u);
  var endTime=new Date();

  document.sign.dec_digest.value=s2hex(b2s(val));

  document.sign.howLong_dec.value=(endTime.getTime()-startTime.getTime())/1000.0;
}

// ================================================================

// This follows the way the form works.  
function noop1(in_s) {
    var in_b = s2b(in_s);
    fb_log("invoking RSAencrypt with "+in_b+","+rsa_e+","+rsa_pq);
    var enc = RSAencrypt(in_b, rsa_e, rsa_pq);
    fb_log("enc_b is "+enc);
    fb_log(s2hex(b2s(enc)));
    var out_b = RSAdecrypt(enc, rsa_d, rsa_p, rsa_q, rsa_u);
    var out = b2s(out_b);
    fb_log(s2hex(b2s(enc)));
    return out;
}

// This reverses the order.

function noop2(in_s) {
    var in_b = s2b(in_s);
    var enc = RSAdecrypt(in_b, rsa_d, rsa_p, rsa_q, rsa_u);
    var out_b = RSAencrypt(enc, rsa_e, rsa_pq);
    var out = b2s(out_b);
    return out;
}

// This function takes hex input and makes hex output

function noop3(in_h) {
    var in_b = s2b(hex2s(in_h));
    var enc = RSAdecrypt(in_b, rsa_d, rsa_p, rsa_q, rsa_u);
    fb_log("encryption is "+s2hex(b2s(out_b))+"(16)");
    var out_b = RSAencrypt(enc, rsa_e, rsa_pq);
    fb_log("string is "+b2s(out_b));
    var out = s2hex(b2s(out_b));
    return out;
}
