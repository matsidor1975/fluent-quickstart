import {
    createMeeClient,
    getDefaultMeeGasTank,
    getDefaultMEENetworkUrl,
    getMEEVersion,
    MEEVersion,
    toMultichainNexusAccount
} from "@biconomy/abstractjs";
import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { fluentTestnet } from "./fluentTestnet";

async function main() {
    /**
     * Creates an MEE client loaded with the EOA account
     */
    const privateKey = generatePrivateKey();
    
    const signer = createWalletClient({
        chain: fluentTestnet, // loads Fluent Testnet chain config
        transport: http(),
        account: privateKeyToAccount(privateKey)
    });
    
    const smartAccount = await toMultichainNexusAccount({
        signer: signer.account,
        chainConfigurations: [
            {
                chain: fluentTestnet,
                transport: http(),
                version: getMEEVersion(MEEVersion.V2_1_0)
            }
        ]
    });
    
    const isStaging = true; // select staging environment for testnet access
    const sponsorshipApiKey = "mee_3Zmc7H6Pbd5wUfUGu27aGzdf"; // default staging api key (rate limited) with sponsorship enabled

    const meeClient = await createMeeClient({
        account: smartAccount,
        url: getDefaultMEENetworkUrl(isStaging),
        apiKey: sponsorshipApiKey,
    });

    /**
     * Builds a dummy instruction that does nothing
     */
    const dummyInstruction = await smartAccount.build({
        type: "default",
        data: {
            calls: [{
                to: "0x0000000000000000000000000000000000000000",
                value: BigInt(0),
                data: "0x",
                gasLimit: 20000n,
            }],
            chainId: fluentTestnet.id
        },
    });

    /**
     * Executes the dummy instruction with MEE client.
     * Result will contain the MEE hash which can be used to get the receipt on the MEEScan:
     * https://meescan.biconomy.io/
     * 
     * NOTE: Make sure to select staging environment on the MEEScan settings page.
     */
    const result = await meeClient.execute({
        instructions: [dummyInstruction],
        sponsorship: true,
        sponsorshipOptions: {
            url: getDefaultMEENetworkUrl(isStaging),
            gasTank: getDefaultMeeGasTank(isStaging)
        },
    });
    console.log(result);
}

main().then(console.log).catch(console.log);
