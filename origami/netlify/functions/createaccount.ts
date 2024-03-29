
import nacl from 'tweetnacl';
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';


async function postData(url, data = {}) {
    // Default options are marked with *
    console.log("token is");
    console.log(process.env.STELLARIDAPIKEY);
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "Authorization": (process.env.STELLARIDAPIKEY as string),
        "accept": "application/json"
      },
      redirect: "follow", // manual, *follow, error// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    console.log("response.ok is: ");
    console.log(response.ok);
    console.log("response body is");
    console.log(response.body);
    console.log("response status is");
    console.log(response.status);
    console.log("status text is");
    console.log(response.statusText);
    const output = await response.json(); // parses JSON response into native JavaScript objects
    console.log("output is");
    console.log(output);
    return output;
  }

/**
 * 
 * address -> string
 * proof -> Keypair.sign('createaccount').toString()
 * username -> string
 * 
 */

interface auth{
  pk:string, //hexString
  address:string, //stellar address
  proof:string //signed item 
}
function handleAuth(auth:auth, testKey):boolean{
  function verifySig(data:Buffer, signature:string, publicKey:string):boolean{
    const signatureBuf = Buffer.from(signature, 'hex');
    const publicKeyBuf = Buffer.from(publicKey, 'hex');
    const uIntsignature = new Uint8Array(signatureBuf.toJSON().data);
    const uIntpublicKey = new Uint8Array(publicKeyBuf.toJSON().data);
    const uIntdata = new Uint8Array(data.toJSON().data);
    return nacl.sign.detached.verify(uIntdata, uIntsignature, uIntpublicKey);
  };
  function  prepairTest(data:string):Buffer{
        const dataHex = Buffer.from(data).toString('hex');
        const safty = Buffer.from("__challenge__").toString('hex');
        //this is done so an evil server couldn't use this function to sign a valid transaction
        const prepaired = Buffer.from(safty+dataHex, 'hex');
        return prepaired;
  }
  const test = prepairTest(testKey);

  return verifySig(test, auth.proof, auth.pk);

}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // your server-side functionality
    const body = JSON.parse(event.body as string);
    const address = body.address;


    if(!handleAuth(body.auth as auth, 'createaccount')){
        console.log("failed verification");
        
        return new Response(JSON.stringify({"success":false, error:"could not auth"}), {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
            },
          status: 402,
        });
    }

    const params = {
        "username": body.username,
        "domain": "metastellar.io",
        "account_id": body.address,
      }
    const url = "https://stellarid.io/api/addresses/"
    const data = await postData(url, params)
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
        },
      body: JSON.stringify(data),
      statusCode: 200,
    }
      
  };
  
  export { handler };