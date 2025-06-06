import { Program, web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Keypair, ParsedAccountData, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction } from "@solana/web3.js";
import { GlobalPool, BoxPool, PrizePool, Reward, PlayerPool } from './types';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
const idl = require('../target/idl/looties_contract.json');

const PROGRAM_ID = "t1ynC7jhTJfZD8idR58Yz6EW8XiwajKzNXusf2tguBV";
const BOX_AUTHORITY_SEED = "box-authority";
const GLOBAL_AUTHORITY_SEED = "global-authority";
const PRIZE_POOL_SEED = "prize-pool";
const PLAYER_POOL_SEED = "player-pool-2";
const SOL_VAULT_SEED = "sol-vault";
const TEMP_BOX_SEED = "temp-box-2";

const MAX_REWARD_IN_BOX = 10;
const MAX_NAME_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 256;
const MAX_IMAGE_URL_LENGTH = 256;
const CHANCE_SUM = 10000;

anchor.setProvider(anchor.AnchorProvider.local(web3.clusterApiUrl('devnet')));
const solConnection = anchor.getProvider().connection;
const wallet = anchor.AnchorProvider.local().wallet as anchor.Wallet;
const payer = wallet.payer;
const authority = payer.publicKey;
const provider = anchor.getProvider();

const tokenAAddress = new anchor.web3.PublicKey("2o2CadSEJ9D3RLoqBgL5L6cSuxQWd2ik175igkAACtPB");
const tokenBAddress = new anchor.web3.PublicKey("HXSWKQVRybmkRZvq8F8bkG2FT2JSqjGeAtnJxvDWrTeM");
const NFTcollection = new anchor.web3.PublicKey("7kZwsnGkJKRkit73yQC96XCzrEDBBzo7iD2s8FME5HtL");
const admin1 = new anchor.web3.PublicKey("CPvqXDUJBwGDH9e2SadrQzFYqCaKiF2UXmxgqkcQdYTZ");
const admin2 = new anchor.web3.PublicKey("CPvqXDUJBwGDH9e2SadrQzFYqCaKiF2UXmxgqkcQdYTZ");
const admin3 = new anchor.web3.PublicKey("CPvqXDUJBwGDH9e2SadrQzFYqCaKiF2UXmxgqkcQdYTZ");

console.log("payer : ", payer.publicKey.toBase58());

let program: Program = null;

// Address of the deployed program.
const programId = new anchor.web3.PublicKey(PROGRAM_ID);

// Generate the program client from IDL.
program = new anchor.Program(idl, programId);
console.log('ProgramId: ', program.programId.toBase58());

const main = async () => {
    // const [globalAuthority, bump] = PublicKey.findProgramAddressSync(
    //     [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    //     program.programId
    // );
    // console.log('GlobalAuthority: ', globalAuthority.toBase58());
    // super admin  : CPvqXDUJBwGDH9e2SadrQzFYqCaKiF2UXmxgqkcQdYTZ
    // admin        : 5RoELXPzGfPFJ8DqHXX6QmgLguYERWfptPC3SUkwCBGz
    // player       : Bw6cx4qzWygKDLtbThv8TxESxsUsEXmcv1X4gUPbSycc

    // ===========> methods related to global pool < =========== //
    // await initProject();
    // await changeSuperAdmin(new anchor.web3.PublicKey("CPvqXDUJBwGDH9e2SadrQzFYqCaKiF2UXmxgqkcQdYTZ"));
    // await addTokenAddress(tokenAAddress);
    console.log(await getGlobalPool());
    
    let boxPool1 = new web3.PublicKey("2gdf8D4PTkGXXzWxTC3bVNVT5ZB3AUrRr3qpkbjJ52Hc");
    let boxPool2 = new web3.PublicKey("Sh1Moqp4R5H4eypH3i47ta6DHRhjQ9hbdghG3bAtRe3");
    let boxPool3 = new web3.PublicKey("5g6MDvFAPTEdGRB4w4PGCbSR8fq7V3gcakEYz22wFX5M");
    let boxPool4 = new web3.PublicKey("EAktPUSdMpT22bnuyS7nUaoNBLWUwCeaecNP8YmHcooG");

    // ===========> methods related to box pool < =========== //
    // await initBoxTest();
    // await updateBoxTest(boxPool2);
    // await changeAdmin(boxPool2, new anchor.web3.PublicKey("5RoELXPzGfPFJ8DqHXX6QmgLguYERWfptPC3SUkwCBGz"))
    // await deposit(boxPool2, new anchor.BN(10 ** 9), new anchor.BN(0 * 10 ** 6), tokenAAddress);
    // await withdraw(boxPool2, new anchor.BN(10 ** 9), new anchor.BN(0), tokenBAddress);
    // await deposit_sol(boxPool2, new anchor.BN(4853600000));
    // await deposit_sol(boxPool1, new anchor.BN(5000000000));
    // await deposit_token(boxPool1, new anchor.BN(1000000), tokenAAddress);
    // await deposit_sol(boxPool2, new anchor.BN(5000000000));
    // await deposit_token(boxPool2, new anchor.BN(1000000), tokenAAddress);
    // console.log(await getBoxPool(boxPool2));

    let nfts = [
        // new anchor.web3.PublicKey("5CWXXyiGxHAmaMT8osSin9r8JjCQcx9KCquPov2MqbSk"),
        // new anchor.web3.PublicKey("2jMM1vZyJwMKj2nY4tu6ffPGUTZHb1ffdfnBDZEcQKN2"),
        // new anchor.web3.PublicKey("A9aY7ent7qTarFEmVFkhB7VQijHUwnUgAy2sa8uaucMT"),
        // new anchor.web3.PublicKey("FxRbLQtzAkXhEQwYjyNSv938cJuKTF4sh49j9fBJoatY"),
        // new anchor.web3.PublicKey("8rPveKTqmpFK21QUpZufiYBJRF2nXSceHnL58Cyxp6Fh"),
        // new anchor.web3.PublicKey("7dz1vhb2DcRVBm8473efNCiGKdXMSziPXkVN8v1LgLk1"),
        // new anchor.web3.PublicKey("8ijMYJY5VBBWmeCxdmkPsrozGHMcxEwdPt2SSJJGP4uk"),
        // new anchor.web3.PublicKey("7MXCJRvL6Ken19UTkEsB6oS8SwcTZSsm4tbJRNHuXaiG"),
        // new anchor.web3.PublicKey("8g4aDKLrxBP2kuSxym4s51S8wv4KJukirMrAmPTAPkLK"),
        // new anchor.web3.PublicKey("7mC1u2PwmRXbKJRGqjytXcPP4Wwh8PTM2p2JGoecthKT"),
        // new anchor.web3.PublicKey("4kxKTYmhMSMFF5cjk2CR4XFkw5bFLWBrLfYfo2yFwnKg"),
    ];
    
    // await depositNfts(boxPool2, NFTcollection, nfts);
    // await withdrawNfts(boxPool2, nfts);
    // console.log(await getPrizePool((await getBoxPool(boxPool1)).prizes));
    
    // ===========> methods related to player pool < =========== //

    // await openBox(boxPool2, 3);
    // await claimReward();
    // console.log(await getPlayerPool());

    /*
        when player open the box, you should call functions step by step.
        1. await openBox(boxPool2, 3);
        2. get reward indexes(you can display rewards with index)
            let lastRewardIdxs = (await getPlayerPool()).lastRewardIdxs;
            lastRewardIdxs.map((reward_idx) => {
                console.log(reward_idx);
            })
        3. await claimReward();
    */
}

/////////////////////
/// Test funciton ///
/////////////////////

const initBoxTest = async () => {
    let defaultKey = PublicKey.default;

    let rewards = [
        {
          name: "0.5 SOL",
          description: "Solana - 0.5",
          imageUrl: "https://public.bnbstatic.com/static/academy/uploads-original/2dde1146856049b0825c1bae268762c8.png",
          rewardType: 1,
          chance: 9 * 10 ** 2,
          sol: new anchor.BN(0.5 * 10 ** 9),
          token: new anchor.BN(0),
          tokenAddress: defaultKey,
          collectionAddress: defaultKey,
        },
        {
          name: "0.05 SOL",
          description: "Solana - 0.05",
          imageUrl: "https://public.bnbstatic.com/static/academy/uploads-original/2dde1146856049b0825c1bae268762c8.png",
          rewardType: 1,
          chance: 50 * 10 ** 2,
          sol: new anchor.BN(0.05 * 10 ** 9),
          token: new anchor.BN(0),
          tokenAddress: defaultKey,
          collectionAddress: defaultKey,
        },
        {
          name: "1 SOL",
          description: "Solana",
          imageUrl: "https://public.bnbstatic.com/static/academy/uploads-original/2dde1146856049b0825c1bae268762c8.png",
          rewardType: 1,
          chance: 1 * 10 ** 2,
          sol: new anchor.BN(1 * 10 ** 9),
          token: new anchor.BN(0),
          tokenAddress: defaultKey,
          collectionAddress: defaultKey,
        },
        {
          name: "1000 TokenA",
          description: "1000 TokenA",
          imageUrl: "https://moon.ly/blog/content/images/2023/01/kinderjaje_create_an_image_of_shiba_inu_dog_breed_inside_of_cry_8ba4523c-ba83-4675-a1a4-46af09a24eb0.png",
          rewardType: 2,
          chance: 16 * 10 ** 2,
          sol: new anchor.BN(0),
          token: new anchor.BN(1000),
          tokenAddress: tokenAAddress,
          collectionAddress: defaultKey,
        },
        {
          name: "250 TokenA",
          description: "250 TokenA",
          imageUrl: "https://moon.ly/blog/content/images/2023/01/kinderjaje_create_an_image_of_shiba_inu_dog_breed_inside_of_cry_8ba4523c-ba83-4675-a1a4-46af09a24eb0.png",
          rewardType: 2,
          chance: 9 * 10 ** 2,
          sol: new anchor.BN(0),
          token: new anchor.BN(1000),
          tokenAddress: tokenAAddress,
          collectionAddress: defaultKey,
        },
        {
          name: "Example NFT",
          description: "Example NFT",
          imageUrl: "https://www.forbes.com/advisor/wp-content/uploads/2022/08/bored_ape_yacht_club.jpeg-1.jpg",
          rewardType: 3,
          chance: 15 * 10 ** 2,
          sol: new anchor.BN(0),
          token: new anchor.BN(0),
          tokenAddress: defaultKey,
          collectionAddress: NFTcollection,
        },
    ];

    // [
    //     {
    //       "name": "Solana Case",
    //       "priceInSol": 0.5,
    //       "image": "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FSolana.png&w=256&q=75"
    //     },
    //     {
    //       "name": "AION",
    //       "priceInSol": 0.69,
    //       "image": "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FAion.png&w=256&q=75"
    //     },
    //     {
    //       "name": "BONK",
    //       "priceInSol": 0.05,
    //       "image": "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FBonk.png&w=256&q=75"
    //     },
    //     {
    //       "name": "50/50",
    //       "priceInSol": 0.15,
    //       "image": "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2F50-50.png&w=256&q=75"
    //     }
    //   ]
    
    await initBox(
        new anchor.web3.PublicKey("5RoELXPzGfPFJ8DqHXX6QmgLguYERWfptPC3SUkwCBGz"),
        "Solana Case",
        "Solana Case",
        "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FSolana.png&w=256&q=75", new anchor.BN(0.5 * 10 ** 9),
        rewards,
    );
    
    await initBox(
        new anchor.web3.PublicKey("5RoELXPzGfPFJ8DqHXX6QmgLguYERWfptPC3SUkwCBGz"),
        "AION",
        "AION",
        "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FAion.png&w=256&q=75", new anchor.BN(0.15 * 10 ** 9),
        rewards,
    );
    
    await initBox(
        new anchor.web3.PublicKey("5RoELXPzGfPFJ8DqHXX6QmgLguYERWfptPC3SUkwCBGz"),
        "BONK",
        "BONK",
        "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FBonk.png&w=256&q=75", new anchor.BN(0.05 * 10 ** 9),
        rewards,
    );
    
    await initBox(
        new anchor.web3.PublicKey("5RoELXPzGfPFJ8DqHXX6QmgLguYERWfptPC3SUkwCBGz"),
        "50/50",
        "50/50",
        "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2F50-50.png&w=256&q=75", new anchor.BN(0.15 * 10 ** 9),
        rewards,
    );
}

const updateBoxTest = async (boxAddress: PublicKey) => {
    let defaultKey = PublicKey.default;

    let rewards = [
        {
          name: "0.5 SOL",
          description: "Solana - 0.5",
          imageUrl: "https://public.bnbstatic.com/static/academy/uploads-original/2dde1146856049b0825c1bae268762c8.png",
          rewardType: 1,
          chance: 9 * 10 ** 2,
          sol: new anchor.BN(0.5 * 10 ** 9),
          token: new anchor.BN(0),
          tokenAddress: defaultKey,
          collectionAddress: defaultKey,
        },
        {
          name: "0.05 SOL",
          description: "Solana - 0.05",
          imageUrl: "https://public.bnbstatic.com/static/academy/uploads-original/2dde1146856049b0825c1bae268762c8.png",
          rewardType: 1,
          chance: 50 * 10 ** 2,
          sol: new anchor.BN(0.05 * 10 ** 9),
          token: new anchor.BN(0),
          tokenAddress: defaultKey,
          collectionAddress: defaultKey,
        },
        {
          name: "1 SOL",
          description: "Solana",
          imageUrl: "https://public.bnbstatic.com/static/academy/uploads-original/2dde1146856049b0825c1bae268762c8.png",
          rewardType: 1,
          chance: 1 * 10 ** 2,
          sol: new anchor.BN(1 * 10 ** 9),
          token: new anchor.BN(0),
          tokenAddress: defaultKey,
          collectionAddress: defaultKey,
        },
        {
          name: "1000 TokenA",
          description: "1000 TokenA",
          imageUrl: "https://moon.ly/blog/content/images/2023/01/kinderjaje_create_an_image_of_shiba_inu_dog_breed_inside_of_cry_8ba4523c-ba83-4675-a1a4-46af09a24eb0.png",
          rewardType: 2,
          chance: 16 * 10 ** 2,
          sol: new anchor.BN(0),
          token: new anchor.BN(1000),
          tokenAddress: tokenAAddress,
          collectionAddress: defaultKey,
        },
        {
          name: "250 TokenA",
          description: "250 TokenA",
          imageUrl: "https://moon.ly/blog/content/images/2023/01/kinderjaje_create_an_image_of_shiba_inu_dog_breed_inside_of_cry_8ba4523c-ba83-4675-a1a4-46af09a24eb0.png",
          rewardType: 2,
          chance: 9 * 10 ** 2,
          sol: new anchor.BN(0),
          token: new anchor.BN(1000),
          tokenAddress: tokenAAddress,
          collectionAddress: defaultKey,
        },
        {
          name: "Example NFT",
          description: "Example NFT",
          imageUrl: "https://www.forbes.com/advisor/wp-content/uploads/2022/08/bored_ape_yacht_club.jpeg-1.jpg",
          rewardType: 3,
          chance: 15 * 10 ** 2,
          sol: new anchor.BN(0),
          token: new anchor.BN(0),
          tokenAddress: defaultKey,
          collectionAddress: NFTcollection,
        },
    ];

    // [
    //     {
    //       "name": "Solana Case",
    //       "priceInSol": 0.5,
    //       "image": "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FSolana.png&w=256&q=75"
    //     },
    //     {
    //       "name": "AION",
    //       "priceInSol": 0.69,
    //       "image": "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FAion.png&w=256&q=75"
    //     },
    //     {
    //       "name": "BONK",
    //       "priceInSol": 0.05,
    //       "image": "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FBonk.png&w=256&q=75"
    //     },
    //     {
    //       "name": "50/50",
    //       "priceInSol": 0.15,
    //       "image": "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2F50-50.png&w=256&q=75"
    //     }
    //   ]
    
    await updateBox(
        boxAddress,
        "AION",
        "AION",
        "https://looties-next-app.vercel.app/_next/image?url=%2Fassets%2Fcases%2FAion.png&w=256&q=75", new anchor.BN(0.69 * 10 ** 9),
        rewards,
    );
}

//////////////////////////////////////////////////
/// Interface to integrate with smart contract ///
//////////////////////////////////////////////////

/**
 * Initialize Global Pool
 * 
 * @access      - super_admin
 */
export const initProject = async () => {
    console.log('==>Initializing program');

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    let txId = await program.methods
        .initialize()
        .accounts({
            super_admin: authority,
            globalPool: globalAuthority,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();
    console.log('super admin for game: ', authority.toString());

    console.log("txHash =", txId);    
}

/**
 * Change super_admin
 * 
 * @access - super_admin
 * 
 * @param - newSuperAdmin   :  new super_admin for game
 */
export const changeSuperAdmin = async (
    newSuperAdmin: PublicKey,
) => {
    console.log('==>changeSuperAdmin to : ', newSuperAdmin.toString());

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    let txId = await program.methods
        .changeSuperAdmin(newSuperAdmin)
        .accounts({
            superAdmin: authority,
            globalPool: globalAuthority,
        })
        .rpc();

    console.log("txHash =", txId);    
}

/**
 * Add spl token to use for game
 * 
 * @access - super_admin
 * 
 * @param - tokenAddress: spl token address to add to game newly
 */
export const addTokenAddress = async (
    tokenAddress: PublicKey,
) => {
    console.log('==>addTokenAddress : ', tokenAddress.toString());

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    // make associated token account for PDA
    {
        let tx = new Transaction();
        let { instructions, destinationAccounts } = await getATokenAccountsNeedCreate(
            solConnection,
            authority,
            globalAuthority,
            [tokenAddress]
        );
    
        if (instructions.length > 0) {
            instructions.map((ix) => tx.add(ix));
            await provider.sendAndConfirm(tx);
        }
    }

    let txId = await program.methods
        .addTokenAddress(tokenAddress)
        .accounts({
            super_admin: authority,
            globalPool: globalAuthority,
        })
        .rpc();

    console.log("txHash =", txId);    
}

/**
 * Add new box
 * 
 * @access  - super_admin
 * 
 * @param   - admin         : admin for box.
 *          - name          : name for box
 *          - description   : description for box
 *          - imageUrl      : image_url for box
 *          - priceInSol    : price in sol that the player must pay to open the box
 *          - rewards       : reward array that the player can get when play on box
 */
export const initBox = async (
    admin: PublicKey,
    name: String,
    description: String,
    imageUrl: String,
    priceInSol: anchor.BN,
    rewards: Reward[],
) => {
    console.log('==>initBox : ');
    if (
        name.length > MAX_NAME_LENGTH ||
        description.length > MAX_DESCRIPTION_LENGTH ||
        imageUrl.length > MAX_IMAGE_URL_LENGTH ||
        rewards.length > MAX_REWARD_IN_BOX
    ) {
        return;
    }

    let sum = 0;
    for (let i = 0; i < rewards.length; i ++) {
        sum += rewards[i].chance;
        if (rewards[i].rewardType != 1 && rewards[i].rewardType != 2 && rewards[i].rewardType != 3) return;
        if (
            rewards[i].name.length > MAX_NAME_LENGTH ||
            rewards[i].description.length > MAX_DESCRIPTION_LENGTH ||
            rewards[i].imageUrl.length > MAX_IMAGE_URL_LENGTH
        ) return;
    }
    if (sum != CHANCE_SUM) return;

    const _rand = Keypair.generate().publicKey;

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    const [boxAuthority, bBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(BOX_AUTHORITY_SEED), _rand.toBuffer()],
        program.programId
    );

    const [tempBoxAuthority, bBump2] = PublicKey.findProgramAddressSync(
        [Buffer.from(BOX_AUTHORITY_SEED), Buffer.from(TEMP_BOX_SEED)],
        program.programId
    );

    const [prizeAuthority, pBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(PRIZE_POOL_SEED), boxAuthority.toBuffer()],
        program.programId
    );

    let txs = [];
    
    // Init temp box tx
    {
        let tx = await program.methods
            .initTempBox(admin, name, description, imageUrl, priceInSol)
            .accounts({
                superAdmin: authority,
                globalPool: globalAuthority,
                boxPool: tempBoxAuthority,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .transaction();

        txs.push({
            tx: tx,
        });
    }

    // Add rewards to temp box txs
    for (let i = 0; i < rewards.length; i ++) {

        let tx = await program.methods
            .addRewardToTempBox(rewards[i])
            .accounts({
                superAdmin: authority,
                globalPool: globalAuthority,
                boxPool: tempBoxAuthority,
            })
            .transaction();

        txs.push({
            tx: tx,
        });
    }

    // Init box tx
    {
        let tx = await program.methods
            .initBox()
            .accounts({
                superAdmin: authority,
                globalPool: globalAuthority,
                tempBoxPool: tempBoxAuthority,
                boxPool: boxAuthority,
                prizePool: prizeAuthority,
                randKey: _rand,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
            })
            .transaction();

        txs.push({
            tx: tx,
        });
    }

    console.log('added new box: address: ', boxAuthority.toString(), ' admin: ', admin.toString());

    let txIds = await provider.sendAll(txs).catch((error) => console.log(error));

    console.log("txIds: ", txIds);
}

/**
 * Update the box
 * 
 * @access  - super_admin
 * 
 * @param   - boxAddress    : box address to update.
 *          - name          : name for box
 *          - description   : description for box
 *          - imageUrl      : image_url for box
 *          - priceInSol    : price in sol that the player must pay to open the box
 *          - rewards       : reward array that the player can get when play on box
 */
export const updateBox = async (
    boxAddress: PublicKey,
    name: String,
    description: String,
    imageUrl: String,
    priceInSol: anchor.BN,
    rewards: Reward[],
) => {
    console.log('==>updateBox : ');
    if (
        name.length > MAX_NAME_LENGTH ||
        description.length > MAX_DESCRIPTION_LENGTH ||
        imageUrl.length > MAX_IMAGE_URL_LENGTH ||
        rewards.length > MAX_REWARD_IN_BOX
    ) {
        return;
    }

    let sum = 0;
    for (let i = 0; i < rewards.length; i ++) {
        sum += rewards[i].chance;
        if (rewards[i].rewardType != 1 && rewards[i].rewardType != 2 && rewards[i].rewardType != 3) return;
        if (
            rewards[i].name.length > MAX_NAME_LENGTH ||
            rewards[i].description.length > MAX_DESCRIPTION_LENGTH ||
            rewards[i].imageUrl.length > MAX_IMAGE_URL_LENGTH
        ) return;
    }
    if (sum != CHANCE_SUM) return;

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    const [tempBoxAuthority, bBump2] = PublicKey.findProgramAddressSync(
        [Buffer.from(BOX_AUTHORITY_SEED), Buffer.from(TEMP_BOX_SEED)],
        program.programId
    );

    let txs = [];
    
    // Init temp box tx
    {
        let tx = await program.methods
            .initTempBox(PublicKey.default, name, description, imageUrl, priceInSol)
            .accounts({
                superAdmin: authority,
                globalPool: globalAuthority,
                boxPool: tempBoxAuthority,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .transaction();

        txs.push({
            tx: tx,
        });
    }

    // Add rewards to temp box txs
    for (let i = 0; i < rewards.length; i ++) {

        let tx = await program.methods
            .addRewardToTempBox(rewards[i])
            .accounts({
                superAdmin: authority,
                globalPool: globalAuthority,
                boxPool: tempBoxAuthority,
            })
            .transaction();

        txs.push({
            tx: tx,
        });
    }

    // Init box tx
    {
        let tx = await program.methods
            .updateBox()
            .accounts({
                superAdmin: authority,
                globalPool: globalAuthority,
                tempBoxPool: tempBoxAuthority,
                boxPool: boxAddress,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
            })
            .transaction();

        txs.push({
            tx: tx,
        });
    }

    console.log('update box: address: ', boxAddress.toString());

    let txIds = await provider.sendAll(txs).catch((error) => console.log(error));

    console.log("txIds: ", txIds);
}

/**
 * Change box admin
 * 
 * @access  - super_admin
 * 
 * @param   - boxAddress    : box address to update.
 *          - newAdmin      : new admin for box
 */
export const changeAdmin = async (
    boxAddress: PublicKey,
    newAdmin: PublicKey,
) => {
    console.log('==>changeAdmin : boxAddress: ', boxAddress.toString(), ' newAdmin: ', newAdmin.toString());

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    let txId = await program.methods
        .changeAdmin(newAdmin)
        .accounts({
            superAdmin: authority,
            globalPool: globalAuthority,
            boxPool: boxAddress,
        })
        .rpc();
    
    console.log("txHash =", txId);    
}

/**
 * Remove box
 * 
 * @access  - super_admin
 * 
 * @param   - boxAddress    : box address to remove.
 */
export const removeBox = async (
    boxAddress: PublicKey,
) => {
    console.log('==>removeBox : boxAddress: ', boxAddress.toString());

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    const [prizeAuthority, pBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(PRIZE_POOL_SEED), boxAddress.toBuffer()],
        program.programId
    );

    let txId = await program.methods
        .removeBox()
        .accounts({
            superAdmin: authority,
            globalPool: globalAuthority,
            boxPool: boxAddress,
            prizePool: prizeAuthority,
        })
        .rpc();
    
    console.log("txHash =", txId);    
}

/**
 * Deposit Sol
 * 
 * @access  - super_admin, admin(admin for box)
 * 
 * @param   - boxAddress    : box address to deposit
 *          - solAmount     : Sol amount to deposit
 */
export const deposit_sol = async (
    boxAddress: PublicKey,
    solAmount: anchor.BN,
) => {
    console.log('==>deposit : SOL: ', solAmount);

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    const [solVault, svBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(SOL_VAULT_SEED)],
        program.programId
    );

    let txId = await program.methods
        .depositSol(solAmount)
        .accounts({
            admin: authority,
            globalPool: globalAuthority,
            boxPool: boxAddress,
            solVault,
            systemProgram: SystemProgram.programId,
        })
        .rpc();

    console.log("txHash =", txId);    
}

/**
 * Withdraw Sol
 * 
 * @access  - admin(admin for box)
 * 
 * @param   - boxAddress    : box address to withdraw
 *          - solAmount     : Sol amount to withdraw
 */
export const withdraw_sol = async (
    boxAddress: PublicKey,
    solAmount: anchor.BN,
) => {
    console.log('==>withdraw : SOL: ', solAmount);

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    const [solVault, svBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(SOL_VAULT_SEED)],
        program.programId
    );

    let txId = await program.methods
        .withdrawSol(solAmount)
        .accounts({
            admin: authority,
            globalPool: globalAuthority,
            boxPool: boxAddress,
            solVault,
            systemProgram: SystemProgram.programId,
        })
        .rpc();

    console.log("txHash =", txId);    
}

/**
 * Deposit Spl token
 * 
 * @access  - super_admin, admin(admin for box)
 * 
 * @param   - boxAddress    : box address to deposit
 *          - tokenAmount   : Token amount to deposit
 *          - tokenAddress  : Token mint address to deposit
 */
export const deposit_token = async (
    boxAddress: PublicKey,
    tokenAmount: anchor.BN,
    tokenAddress: PublicKey,
) => {
    console.log('==>deposit : Token(', tokenAddress.toString(), '): ' , tokenAmount);

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    let adminTokenAccount = await getAssociatedTokenAccount(authority, tokenAddress);
    let gameTokenAccount = await getAssociatedTokenAccount(globalAuthority, tokenAddress);

    let txId = await program.methods
        .depositToken(tokenAmount)
        .accounts({
            admin: authority,
            globalPool: globalAuthority,
            boxPool: boxAddress,
            tokenAdmin: adminTokenAccount,
            tokenVault: gameTokenAccount,
            tokenMint: tokenAddress,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

    console.log("txHash =", txId);    
}

/**
 * Withdraw Spl token
 * 
 * @access  - admin(admin for box)
 * 
 * @param   - boxAddress    : box address to withdraw
 *          - tokenAmount   : Token amount to withdraw
 *          - tokenAddress  : Token mint address to withdraw
 */
export const withdraw_token = async (
    boxAddress: PublicKey,
    tokenAmount: anchor.BN,
    tokenAddress: PublicKey,
) => {
    console.log('==>withdraw : Token(', tokenAddress.toString(), '): ' , tokenAmount);

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    {
        let tx = new Transaction();
        let { instructions, destinationAccounts } = await getATokenAccountsNeedCreate(
            solConnection,
            authority,
            authority,
            [tokenAddress]
        );
        if (instructions.length > 0) {
            instructions.map((ix) => tx.add(ix));
            await provider.sendAndConfirm(tx);
        }
    }

    let adminTokenAccount = await getAssociatedTokenAccount(authority, tokenAddress);
    let gameTokenAccount = await getAssociatedTokenAccount(globalAuthority, tokenAddress);

    let txId = await program.methods
        .withdrawToken(tokenAmount)
        .accounts({
            admin: authority,
            globalPool: globalAuthority,
            boxPool: boxAddress,
            tokenAdmin: adminTokenAccount,
            tokenVault: gameTokenAccount,
            tokenMint: tokenAddress,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

    console.log("txHash =", txId);    
}

/**
 * Deposit Nfts
 * 
 * @access  - super_admin, admin(admin for box)
 * 
 * @param   - boxAddress    : box address to deposit
 *          - collection    : collection NFT address
 *          - nfts          : NFT address into collection to deposit (up to 10 nfts)
 */
export const depositNfts = async (
    boxAddress: PublicKey,
    collection: PublicKey,
    nfts: PublicKey[],
) => {
    console.log('==> deposit NFTs')
    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    const [prizeAuthority, pBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(PRIZE_POOL_SEED), boxAddress.toBuffer()],
        program.programId
    );

    {
        let { instructions, destinationAccounts } = await getATokenAccountsNeedCreate(
            solConnection,
            authority,
            globalAuthority,
            nfts
        );
        if (instructions.length > 0) {
            let txs = [];
            let step = 7;
            for (let i = 0; i < instructions.length; i += step) {
                let tx = new Transaction();
                instructions.slice(i, i + step).map((ix) => tx.add(ix));
                txs.push({
                    tx: tx,
                });
            }
            let txIds = await provider.sendAll(txs);
            console.log("txIds: ", txIds);
        }
    }


    let txs = [];
    let step = 5;
    for (let i = 0; i < nfts.length; i += step) {
        let tempNfts = nfts.slice(i, i + step);

        let remainingAccounts = [];

        for (var nft of tempNfts) {
            remainingAccounts.push({ pubkey: await getAssociatedTokenAccount(authority, nft), isSigner: false, isWritable: true })
            remainingAccounts.push({ pubkey: await getAssociatedTokenAccount(globalAuthority, nft), isSigner: false, isWritable: true })
        }

        let tx = await program.methods
            .depositNfts(collection, tempNfts)
            .accounts({
                admin: authority,
                globalPool: globalAuthority,
                boxPool: boxAddress,
                prizePool: prizeAuthority,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .remainingAccounts(remainingAccounts)
            .transaction();

        txs.push({
            tx: tx,
        });
    }

    let txIds = await provider.sendAll(txs);
    console.log("txIds: ", txIds);
}

/**
 * Withdraw Nfts
 * 
 * @access  - admin(admin for box)
 * 
 * @param   - boxAddress    : box address to withdraw
 *          - nfts          : NFT address into collection to withdraw (up to 10)
 */
export const withdrawNfts = async (
    boxAddress: PublicKey,
    nfts: PublicKey[],
) => {
    console.log('==> withdraw NFTs');

    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    const [prizeAuthority, pBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(PRIZE_POOL_SEED), boxAddress.toBuffer()],
        program.programId
    );

    {
        let { instructions, destinationAccounts } = await getATokenAccountsNeedCreate(
            solConnection,
            authority,
            authority,
            nfts
        );
        if (instructions.length > 0) {
            let txs = [];
            let step = 7;
            for (let i = 0; i < instructions.length; i += step) {
                let tx = new Transaction();
                instructions.slice(i, i + step).map((ix) => tx.add(ix));
                txs.push({
                    tx: tx,
                });
            }
            let txIds = await provider.sendAll(txs);
            console.log("txIds: ", txIds);
        }
    }

    let txs = [];
    let step = 5;
    for (let i = 0; i < nfts.length; i += step) {
        let tempNfts = nfts.slice(i, i + step)
        let remainingAccounts = [];

        for (var nft of tempNfts) {
            remainingAccounts.push({ pubkey: await getAssociatedTokenAccount(globalAuthority, nft), isSigner: false, isWritable: true })
            remainingAccounts.push({ pubkey: await getAssociatedTokenAccount(authority, nft), isSigner: false, isWritable: true })
        }

        let tx = await program.methods
            .withdrawNfts(tempNfts)
            .accounts({
                admin: authority,
                globalPool: globalAuthority,
                boxPool: boxAddress,
                prizePool: prizeAuthority,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .remainingAccounts(remainingAccounts)
            .transaction();

        txs.push({
            tx: tx,
        });
    }

    let txIds = await provider.sendAll(txs);
    console.log("txIds: ", txIds);
}

/**
 * Open box
 * 
 * @access  - player
 * 
 * @param   - boxAddress
 *          - openTimes
 */
export const openBox = async (
    boxAddress: PublicKey,
    openTimes: number,
) => {
    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    const [solVault, svBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(SOL_VAULT_SEED)],
        program.programId
    );

    const [prizeAuthority, pBump1] = PublicKey.findProgramAddressSync(
        [Buffer.from(PRIZE_POOL_SEED), boxAddress.toBuffer()],
        program.programId
    );

    const [playerAuthority, pBump2] = PublicKey.findProgramAddressSync(
        [Buffer.from(PLAYER_POOL_SEED), authority.toBuffer()],
        program.programId
    );

    let txId = await program.methods
        .openBox(openTimes)
        .accounts({
            player: authority,
            globalPool: globalAuthority,
            boxPool: boxAddress,
            prizePool: prizeAuthority,
            playerPool: playerAuthority,
            solVault,
            admin1,
            admin2,
            admin3,
            systemProgram: SystemProgram.programId,
        })
        .rpc();

    console.log("txHash =", txId);    
}

/**
 * Claim Reward
 * 
 * @access  - player
 */
export const claimReward = async () => {
    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    const [solVault, svBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(SOL_VAULT_SEED)],
        program.programId
    );

    const [playerAuthority, pBump2] = PublicKey.findProgramAddressSync(
        [Buffer.from(PLAYER_POOL_SEED), authority.toBuffer()],
        program.programId
    );

    const globalPool = await getGlobalPool();
    const playerPool = await getPlayerPool();

    let tokenAddresses = globalPool.tokenAddress.concat(playerPool.claimableNfts);

    {
        let { instructions, destinationAccounts } = await getATokenAccountsNeedCreate(
            solConnection,
            authority,
            authority,
            tokenAddresses
        );
        if (instructions.length > 0) {
            let txs = [];
            let step = 7;
            for (let i = 0; i < instructions.length; i += step) {
                let tx = new Transaction();
                instructions.slice(i, i + step).map((ix) => tx.add(ix));
                txs.push({
                    tx: tx,
                });
            }
            let txIds = await provider.sendAll(txs);
            console.log("txIds: ", txIds);
        }
    }

    let txs = [];
    // claim tokens
    {
        let remainingAccounts = [];

        for (var token of globalPool.tokenAddress) {
            remainingAccounts.push({ pubkey: await getAssociatedTokenAccount(globalAuthority, token), isSigner: false, isWritable: true })
            remainingAccounts.push({ pubkey: await getAssociatedTokenAccount(authority, token), isSigner: false, isWritable: true })
        }
    
        let tx = await program.methods
            .claimRewardToken()
            .accounts({
                player: authority,
                globalPool: globalAuthority,
                playerPool: playerAuthority,
                solVault,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .remainingAccounts(remainingAccounts)
            .transaction();
        
        txs.push({
            tx: tx,
        });
    }

    // claim nfts
    {
        let step = 7;
        for (let i = 0; i < playerPool.claimableNfts.length; i += step) {
            const nfts = playerPool.claimableNfts.slice(i, i + step);

            let remainingAccounts = [];

            for (var nft of nfts) {
                remainingAccounts.push({ pubkey: await getAssociatedTokenAccount(globalAuthority, nft), isSigner: false, isWritable: true })
                remainingAccounts.push({ pubkey: await getAssociatedTokenAccount(authority, nft), isSigner: false, isWritable: true })
            }
    
            let tx = await program.methods
                .claimRewardNfts(nfts)
                .accounts({
                    player: authority,
                    globalPool: globalAuthority,
                    playerPool: playerAuthority,
                    systemProgram: SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .remainingAccounts(remainingAccounts)
                .transaction();

            txs.push({
                tx: tx,
            })
        }
    }

    if (txs.length > 0) {
        let txIds = await provider.sendAll(txs);
        console.log("txIds: ", txIds);
    }
}

export const getGlobalPool = async (): Promise<GlobalPool | null> => {
    const [globalAuthority, gBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId
    );

    try {
        return await program.account.globalPool.fetch(globalAuthority) as unknown as GlobalPool;
    } catch {
        return null;
    }
}

export const getBoxPool = async (boxAddress): Promise<BoxPool | null> => {
    try {
        return await program.account.boxPool.fetch(boxAddress) as unknown as BoxPool;
    } catch {
        return null;
    }
}

export const getPlayerPool = async (): Promise<PlayerPool | null> => {
    const [playerAuthority, pBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(PLAYER_POOL_SEED), authority.toBuffer()],
        program.programId
    );

    try {
        return await program.account.playerPool.fetch(playerAuthority) as unknown as PlayerPool;
    } catch {
        return null;
    }
}

export const getPrizePool = async (prizeAddress): Promise<PrizePool | null> => {
    try {
        return await program.account.prizePool.fetch(prizeAddress) as unknown as PrizePool;
    } catch {
        return null;
    }
}

export const getDecimals = async (owner: PublicKey, tokenMint: PublicKey): Promise<number | null> => {
    try {
        let ownerTokenAccount = await getAssociatedTokenAccount(owner, tokenMint);
        const tokenAccount = await solConnection.getParsedAccountInfo(ownerTokenAccount);
        let decimal = (tokenAccount.value?.data as ParsedAccountData).parsed.info.tokenAmount.decimals;
        let DECIMALS = Math.pow(10, decimal);
        return DECIMALS;
    } catch {
        return null;
    }
}

export const getATokenAccountsNeedCreate = async (
    connection: anchor.web3.Connection,
    walletAddress: anchor.web3.PublicKey,
    owner: anchor.web3.PublicKey,
    nfts: anchor.web3.PublicKey[],
) => {
    let instructions = [], destinationAccounts = [];
    for (const mint of nfts) {
        const destinationPubkey = await getAssociatedTokenAccount(owner, mint);
        let response = await connection.getAccountInfo(destinationPubkey);
        if (!response) {
            const createATAIx = createAssociatedTokenAccountInstruction(
                destinationPubkey,
                walletAddress,
                owner,
                mint,
            );
            instructions.push(createATAIx);
        }
        destinationAccounts.push(destinationPubkey);
        if (walletAddress != owner) {
            const userAccount = await getAssociatedTokenAccount(walletAddress, mint);
            response = await connection.getAccountInfo(userAccount);
            if (!response) {
                const createATAIx = createAssociatedTokenAccountInstruction(
                    userAccount,
                    walletAddress,
                    walletAddress,
                    mint,
                );
                instructions.push(createATAIx);
            }
        }
    }
    return {
        instructions,
        destinationAccounts,
    };
}

export const createAssociatedTokenAccountInstruction = (
    associatedTokenAddress: anchor.web3.PublicKey,
    payer: anchor.web3.PublicKey,
    walletAddress: anchor.web3.PublicKey,
    splTokenMintAddress: anchor.web3.PublicKey
) => {
    const keys = [
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: walletAddress, isSigner: false, isWritable: false },
        { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
        {
            pubkey: anchor.web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        {
            pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
    ];
    return new anchor.web3.TransactionInstruction({
        keys,
        programId: ASSOCIATED_TOKEN_PROGRAM_ID,
        data: Buffer.from([]),
    });
}

const getAssociatedTokenAccount = async (ownerPubkey: PublicKey, mintPk: PublicKey): Promise<PublicKey> => {
    let associatedTokenAccountPubkey = PublicKey.findProgramAddressSync(
        [
            ownerPubkey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintPk.toBuffer(), // mint address
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
    )[0];
    return associatedTokenAccountPubkey;
}

main()
