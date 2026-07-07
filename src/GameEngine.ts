import {
  Enemy,
  EnemyType,
  Bullet,
  ShieldBullet,
  EnemyBullet,
  Explosion,
  GameParticle,
  PLAYER_MULTISHOT_FIRE_ANIMS,
  GameState,
  SOUNDS,
  SHOP_SOUNDS,
  MUSIC_TRACKS,
  PLAYER_ANIMS,
  BULLET_ANIMS,
  DEFAULT_BULLET_SPRITE,
  PLAYER_SPRITES,
  LIFE_IMAGES,
  COIN_ICON_URL,
  CURSOR_URL,
  MAGIC_BULLET_SPRITE,
  ARMORED_BULLET_SPRITE,
  SHOOTER_BULLET_SPRITE,
  BOMBER_SPRITES,
  BOMBER_EXPLOSION_FRAMES,
  DOOR_ANIM_FRAMES,
  ARROW_FRAMES,
  DEFAULTS,
  DEV_STAT_LIMITS,
  HIT_COOLDOWN,
  PLAYER_HITBOX_SIZE,
  PLAYER_MUZZLE_DISTANCE,
  SHOP_SPRITE_SIZE,
  SHOP_AREA_X,
  SHOP_AREA_Y,
  CLONE_FINAL_RADIUS,
  CLONE_ANIMATION_DURATION,
  SHOP_FADE_DURATION,
  SHOP_SCREEN_WIDEN_FACTOR,
  SHOP_ARROW_BEEP_INTERVAL,
  BOMBER_TRIGGER_RADIUS,
  BOMBER_EXPLOSION_RADIUS,
  BOMBER_EXPLOSION_FRAME_TIME,
  ENEMY_TYPES,
  MISSION_DATABASE,
  ENCHANTMENTS,
  getEnchantmentPrice,
  clamp,
  roundToStep,
  isEnchantmentMaxedForValues,
  SHOP_ITEM_WIDTH,
  SHOP_ITEM_HEIGHT,
  SHOP_ITEM_GAP,
  SHOP_ITEM_ROW_GAP,
  SHOP_ITEM_COLUMNS,
  DEV_PASSWORD
} from "./types";

const BIOME_TEXTURES: {
  ground: Record<string, string>;
  waterAnimation: string[];
  transitions: Record<string, Record<string, string | string[]>>;
} = {
  ground: {
    grass: "https://codehs.com/uploads/9590b1656ef811030581e96698b0fa7f",
    forest: "https://codehs.com/uploads/e832f2d8e871b89da8f7bae50c113e17",
    water: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
    stone: "https://codehs.com/uploads/d7d540bb24f9c949b7b23f93eba3fffd",
    magma: "https://codehs.com/uploads/f320d99bc77fe9bded47392f548428b4",
    lava: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
    snow: "https://codehs.com/uploads/a6e6de813631d91f464420f7a2b03dc9",
    ice: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
    desert: "https://codehs.com/uploads/c9be372e02634c6e24c108fdb9178097"
  },
  waterAnimation: [
    "https://codehs.com/uploads/0766d723461a7b28bd7ffd7900f3a075",
    "https://codehs.com/uploads/e7e2fdf20794119b67fea720be09bdbb",
    "https://codehs.com/uploads/d7a469d100e102fb50efff8fc6622523",
    "https://codehs.com/uploads/48b5e2da04dba64a0fa31ed706403458",
    "https://codehs.com/uploads/bf8a9d12fe829ea483ca05e9e1c572bc",
    "https://codehs.com/uploads/fd9e349505c2aac5833387ec4c0a7f14",
    "https://codehs.com/uploads/16e043aa562cf23ab64527c4776d066c",
    "https://codehs.com/uploads/97f1fd0b433947322f929da7e74a6946",
    "https://codehs.com/uploads/102205bb897b7934776e474c631d0be9"
  ],
  transitions: {
    grass_forest: {
      top: "https://codehs.com/uploads/f4f2b1c2a2bbd867f995b636e65d4e71",
      right: "https://codehs.com/uploads/e674b576c2e74bd3d7eda94260a5ad07",
      bottom: "https://codehs.com/uploads/d98c715d133b0d759275537a2996dd22",
      left: "https://codehs.com/uploads/c259b9e90ef7aaa27eef9dd44d28d742",
      outerTopLeft: "https://codehs.com/uploads/8c0dc701a25c234329eab1a78cc40216",
      outerTopRight: "https://codehs.com/uploads/2241de40e2731f25d5847d201bf0489f",
      outerBottomLeft: "https://codehs.com/uploads/c1331f59f9293b14b6af8df66f537d75",
      outerBottomRight: "https://codehs.com/uploads/2a8a86d6d7a28882536616acfef7e10b",
      innerTopLeft: "https://codehs.com/uploads/e6e269f4444fedda36ce56fcd70e7a36",
      innerTopRight: "https://codehs.com/uploads/8a1e79da00ca9ef0fd145a1ca1b74bc0",
      innerBottomLeft: "https://codehs.com/uploads/72997b51fcc013b0c2042104f4348728",
      innerBottomRight: "https://codehs.com/uploads/a66f0409a18750078a885da83a067898"
    },
    grass_stone: {
      top: "https://codehs.com/uploads/53478fd25bd87a061b563f53509dfc50",
      right: "https://codehs.com/uploads/484a412fa57765c1c6f6904f925f324d",
      bottom: "https://codehs.com/uploads/5a0cacf9e156b10303ea3ba696bc5bc9",
      left: "https://codehs.com/uploads/c1bd91f1240a8ec68c63dc986923fda8",
      outerTopLeft: "https://codehs.com/uploads/2cb07f9d13c54ade1eeefbd4ea9c6180",
      outerTopRight: "https://codehs.com/uploads/0d55293709c708bfa327d543175b716e",
      outerBottomLeft: "https://codehs.com/uploads/21d8c5b0d5673960d4eaac6b78d28970",
      outerBottomRight: "https://codehs.com/uploads/431606eb83c1df7ac4bdf3e6426d0593",
      innerTopLeft: "https://codehs.com/uploads/9384b213068abf2d9f8e61ebdf0a61ab",
      innerTopRight: "https://codehs.com/uploads/700e84ced7c83b523707ba0fdfc6d787",
      innerBottomLeft: "https://codehs.com/uploads/893925fae471d77a827b5c70a63a2ed4",
      innerBottomRight: "https://codehs.com/uploads/34d067df837273c182f42a9e9cb111b0"
    },
    grass_desert: {
      top: "https://codehs.com/uploads/ebe5f6d679266e881f08dbe7da459e1a",
      right: "https://codehs.com/uploads/f937dc09845f1dfceba84d579723bd7d",
      bottom: "https://codehs.com/uploads/bab112de3bfea903a99fe70cd725922a",
      left: "https://codehs.com/uploads/5a5f615bd6b7f6adf3b3b8053c114e39",
      outerTopLeft: "https://codehs.com/uploads/7f9c2ebc112e0802428df017abf5d251",
      outerTopRight: "https://codehs.com/uploads/e8a9b67c8a868b68792be511e92d9b90",
      outerBottomLeft: "https://codehs.com/uploads/b113f9efd5442f01ad517a545a1caf3a",
      outerBottomRight: "https://codehs.com/uploads/0a575ad6a2202a2df0ffd06e43bbb024",
      innerTopLeft: "https://codehs.com/uploads/c40fb7be06460fb432eb19f0b7cc323e",
      innerTopRight: "https://codehs.com/uploads/7003ed3c6201df490b1c33a6d2978588",
      innerBottomLeft: "https://codehs.com/uploads/ac2d660390f2c6bc138851f337182415",
      innerBottomRight: "https://codehs.com/uploads/481b530fea2eb558efce274c2365ce25"
    },
    grass_magma: {
      top: "https://codehs.com/uploads/7da0bc16a6669d9f024f6d779fd2570d",
      right: "https://codehs.com/uploads/a5c5392953587eb75870be8388c7c321",
      bottom: "https://codehs.com/uploads/53ecad21c6171dceb08f35119633ee09",
      left: "https://codehs.com/uploads/8e80f634f34fbc0c8e43024257150c70",
      outerTopLeft: "https://codehs.com/uploads/1eaaaa3bce56e1cfaa7b8dece822b5a2",
      outerTopRight: "https://codehs.com/uploads/43d4ff12b77a74feb27250f69e48b4cf",
      outerBottomLeft: "https://codehs.com/uploads/187e94df1387447903def82e3c20bde1",
      outerBottomRight: "https://codehs.com/uploads/c4f42a4d3a1910fe6a27f490ece2ca28",
      innerTopLeft: "https://codehs.com/uploads/ba0f739ae220f9bc01e13f30d82f364b",
      innerTopRight: "https://codehs.com/uploads/68b37e4473a8f30731ba65f33ac9115e",
      innerBottomLeft: "https://codehs.com/uploads/2e7c5a9472f7a5b20d021900bb735480",
      innerBottomRight: "https://codehs.com/uploads/0dc6a3a88bce53d5a050d7eb4fc9c3f8"
    },
    grass_snow: {
      top: "https://codehs.com/uploads/707ed9dcffb0dad86442d3e6828b3157",
      right: "https://codehs.com/uploads/adc3937d1432578f1e4469792f9cc8e8",
      bottom: "https://codehs.com/uploads/a815a8b1db9a3f28e39b2090099e000e",
      left: "https://codehs.com/uploads/15984c4737d148e7939750021dc7b08f",
      outerTopLeft: "https://codehs.com/uploads/28812a7259429591baea0f84a56856b5",
      outerTopRight: "https://codehs.com/uploads/b44da0fbc5504ead71d589229503b59e",
      outerBottomLeft: "https://codehs.com/uploads/97e0f404d7270d58864152d31fe5274e",
      outerBottomRight: "https://codehs.com/uploads/c3173185d399d75e0b600f441dd1d178",
      innerTopLeft: "https://codehs.com/uploads/795a662d4edaadb3ab6fa6d85b1f12a0",
      innerTopRight: "https://codehs.com/uploads/59caed2fec026b253dc6cde7b375a31f",
      innerBottomLeft: "https://codehs.com/uploads/f1adc735d9e89c8c54b63254277a534b",
      innerBottomRight: "https://codehs.com/uploads/b334922e120f856cc6bb33e45732bc45"
    },
    forest_stone: {
      top: "https://codehs.com/uploads/982b885a14bda932e9c12c01d3102dae",
      right: "https://codehs.com/uploads/6862aee28ab945616f9df0d4e4740706",
      bottom: "https://codehs.com/uploads/519c97f0d7c9e6f854595a10cf861357",
      left: "https://codehs.com/uploads/72054ed9047d987e412c2132a891379e",
      outerTopLeft: "https://codehs.com/uploads/6f3df466d298ca4110f5f4f740349cbb",
      outerTopRight: "https://codehs.com/uploads/f4aef0260b65e08ef5f73e610f9ae549",
      outerBottomLeft: "https://codehs.com/uploads/48809401906e470bb0dcd133f9dd9067",
      outerBottomRight: "https://codehs.com/uploads/fcda9897ea6263a283094d424e5cf68f",
      innerTopLeft: "https://codehs.com/uploads/b9a0a1544b4b84b8e32de36925039642",
      innerTopRight: "https://codehs.com/uploads/a8ae65c3f5ced8eac584e77ab4c408d1",
      innerBottomLeft: "https://codehs.com/uploads/72faba2836874d02d39c5f9b1fdb4939",
      innerBottomRight: "https://codehs.com/uploads/0c3b63a00085bf5c05cd07a2f9c20c31"
    },
    forest_desert: {
      top: "https://codehs.com/uploads/5229a713bbe988c934a6cdc1bdb340cb",
      right: "https://codehs.com/uploads/c73cf30a0e642fabf08cd24424e8f3fa",
      bottom: "https://codehs.com/uploads/1d08c9287fc02f65b8a858af55f1d97e",
      left: "https://codehs.com/uploads/3020721d3884b122949141d7c8a808a7",
      outerTopLeft: "https://codehs.com/uploads/c10319c4bc47dd029c4e3a90bfc39793",
      outerTopRight: "https://codehs.com/uploads/27395530b6004a915b0d94ae2214c8b4",
      outerBottomLeft: "https://codehs.com/uploads/522407d1079b678964e4d5894b90d2b4",
      outerBottomRight: "https://codehs.com/uploads/8e3bf353efbee773df5a51467ec96c14",
      innerTopLeft: "https://codehs.com/uploads/9afbb72738ef87dd67e4adb580022ea3",
      innerTopRight: "https://codehs.com/uploads/60adbaac94440c4ac87a2b8259d7c97d",
      innerBottomLeft: "https://codehs.com/uploads/a2b048644988eccd8771c342be74edcc",
      innerBottomRight: "https://codehs.com/uploads/c4a154062502fddebcbd8a0d26e7dc56"
    },
    forest_magma: {
      top: "https://codehs.com/uploads/7277155b71e829755b05e3efd3643dd3",
      right: "https://codehs.com/uploads/9b8010408cbe7dbd6a65373c9bd0395f",
      bottom: "https://codehs.com/uploads/930db69369d878bd8e7d0432bb3c66bd",
      left: "https://codehs.com/uploads/51dc3685faf7d67e8aea95fe21808f85",
      outerTopLeft: "https://codehs.com/uploads/4b6dac37513f1f339cd6f8cae46ac55b",
      outerTopRight: "https://codehs.com/uploads/c10c427ea5843bbb2eee213a3e7116b9",
      outerBottomLeft: "https://codehs.com/uploads/268bcfe716af8cdd5185cccfafd54b16",
      outerBottomRight: "https://codehs.com/uploads/5e73ae7c707ecc4cc0ff995f7bfaad38",
      innerTopLeft: "https://codehs.com/uploads/0760557ecca968b9fb09f71588556ee4",
      innerTopRight: "https://codehs.com/uploads/8c47ca1e5dcb7c62827aed776d547258",
      innerBottomLeft: "https://codehs.com/uploads/cad2a622cb984023ac8e85003e9d2cff",
      innerBottomRight: "https://codehs.com/uploads/9a4ad3b916cf8d3031bbc9c3fe33e358"
    },
    forest_snow: {
      top: "https://codehs.com/uploads/5bf7f4f8d63ce814938f4b497e4662bd",
      right: "https://codehs.com/uploads/e8993e07b0c1575dede027484133fcec",
      bottom: "https://codehs.com/uploads/8ce4c506897e0bbed985df1319f140c1",
      left: "https://codehs.com/uploads/26d31983474d3e02ab2504648e11382b",
      outerTopLeft: "https://codehs.com/uploads/e212fecf7009013448a533b73bc13d29",
      outerTopRight: "https://codehs.com/uploads/193f2664984043bfa9744cd742087eef",
      outerBottomLeft: "https://codehs.com/uploads/10d5b3547b3bd709c71ecad76990516e",
      outerBottomRight: "https://codehs.com/uploads/751c9a9134ecae491d08bd7a4d562aa3",
      innerTopLeft: "https://codehs.com/uploads/2b7acb9960540f66951b115df28767aa",
      innerTopRight: "https://codehs.com/uploads/f36f0f8ce8314b067a02a2fe7dfecb10",
      innerBottomLeft: "https://codehs.com/uploads/414d67e2ef0322375155846646a1be3d",
      innerBottomRight: "https://codehs.com/uploads/0a9d86cbc467908279eeae0dec438f1b"
    },
    stone_desert: {
      top: "https://codehs.com/uploads/ff3f2bc8c8efe673455fb3b5d141859a",
      right: "https://codehs.com/uploads/bf6e6994aae0214c74473b99d5362b2a",
      bottom: "https://codehs.com/uploads/c2ccbc5e6808924b4072f21d5d6186c7",
      left: "https://codehs.com/uploads/5026677a604648d18e9d0ed3e1a35fdb",
      outerTopLeft: "https://codehs.com/uploads/c4752532f30b1a37e62cebc0143b158e",
      outerTopRight: "https://codehs.com/uploads/6cd55e26ba2aa8e8500b304f1deb8e08",
      outerBottomLeft: "https://codehs.com/uploads/5de505cb80b45b5c8342d17befddac22",
      outerBottomRight: "https://codehs.com/uploads/3530945dfe5e19da18e9c54a5ebcd340",
      innerTopLeft: "https://codehs.com/uploads/353be72ad64dd9a9af1218897cebfb2e",
      innerTopRight: "https://codehs.com/uploads/5c3ef87766a1cf0e1db644cfe7873777",
      innerBottomLeft: "https://codehs.com/uploads/39dc8cb2dce89c39ae0640ac88b10167",
      innerBottomRight: "https://codehs.com/uploads/949a681e52e35f8bdfc59d3171b14e50"
    },
    stone_magma: {
      top: "https://codehs.com/uploads/18c8ebe04adb0d65bc7039fa0590e177",
      right: "https://codehs.com/uploads/ac6a28c2018058d0fd8a9953a542a505",
      bottom: "https://codehs.com/uploads/669b4230b305d5a3fb456324129fb2ce",
      left: "https://codehs.com/uploads/36c74859892a87805a30497f2abd9c13",
      outerTopLeft: "https://codehs.com/uploads/feb64cbd7ca78608441f9e1aa3cf3744",
      outerTopRight: "https://codehs.com/uploads/1e94a1d49cb711df9c20862c2a147b12",
      outerBottomLeft: "https://codehs.com/uploads/5772616ed6fe02a46960e91190053dba",
      outerBottomRight: "https://codehs.com/uploads/6a3751531726255ae169f9f731c8bcd9",
      innerTopLeft: "https://codehs.com/uploads/32a94d9d1ccf2546cce42b6fda1df46d",
      innerTopRight: "https://codehs.com/uploads/32a94d9d1ccf2546cce42b6fda1df46d",
      innerBottomLeft: "https://codehs.com/uploads/d500c93164b985ad38792d0e58705e30",
      innerBottomRight: "https://codehs.com/uploads/f2c3ced5bcb4cda8e78f551fb886f82a"
    },
    stone_snow: {
      top: "https://codehs.com/uploads/ec9ce1fd86e92454d44c4149c467449d",
      right: "https://codehs.com/uploads/e858d4f558eff4a4173e2a7470469c98",
      bottom: "https://codehs.com/uploads/f2ef72a7e85806efba920eb5ec489754",
      left: "https://codehs.com/uploads/ccbe0cc6e2d7e5dff2b9adda0591dfd6",
      outerTopLeft: "https://codehs.com/uploads/1e95157392435ed0a403a01922a3bc84",
      outerTopRight: "https://codehs.com/uploads/51760caa0b44d1dbc18e6f68ebc07e3b",
      outerBottomLeft: "https://codehs.com/uploads/977eb4ada73957f9db3dfbbf7d270d21",
      outerBottomRight: "https://codehs.com/uploads/3245c088ce0b9330bd01d6270ab11c74",
      innerTopLeft: "https://codehs.com/uploads/87f72764d1a3784e0ffbcda1144da120",
      innerTopRight: "https://codehs.com/uploads/fcb7abe1a9be3f9b6ad63341b0d21ccb",
      innerBottomLeft: "https://codehs.com/uploads/dae43d5e949eb22a2755abfb262146e1",
      innerBottomRight: "https://codehs.com/uploads/08f0bebd5b0553ef61d2b667794aab15"
    },
    snow_ice: {
      top: "https://codehs.com/uploads/39cc21f89307629f8aef5642c8a6aaef",
      right: "https://codehs.com/uploads/465f85c7061016e10b38999473303adf",
      bottom: "https://codehs.com/uploads/da8138f9e9f9c517f929f2a5fe8ad414",
      left: "https://codehs.com/uploads/5ca222d298b6248175389c03465b7e18",
      outerTopLeft: "https://codehs.com/uploads/c776ef2e4ca7d3022cef3278996a1782",
      outerTopRight: "https://codehs.com/uploads/d5c8be7418106b42c9fc8696b27de777",
      outerBottomLeft: "https://codehs.com/uploads/1a7dd99b829f5d5bcc5e7641e784b86a",
      outerBottomRight: "https://codehs.com/uploads/84d653c50744226b1348f0b8d4f18b04",
      innerTopLeft: "https://codehs.com/uploads/af8f2f5fb0092861e61491a5b8c57fe0",
      innerTopRight: "https://codehs.com/uploads/d6f1021372a123cff4d2f35f3e60a45b",
      innerBottomLeft: "https://codehs.com/uploads/ee082f1810ba16b360c514b525d59a41",
      innerBottomRight: "https://codehs.com/uploads/9aef6113c3a450c116e664422080d772"
    },
    magma_lava: {
      top: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      right: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      bottom: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      left: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      outerTopLeft: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      outerTopRight: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      outerBottomLeft: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      outerBottomRight: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      innerTopLeft: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      innerTopRight: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      innerBottomLeft: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311",
      innerBottomRight: "https://codehs.com/uploads/b40e7845093c42f37e58111f942f0311"
    },
    desert_water: {
      top: [
        "https://codehs.com/uploads/f13983be090342dcca255e37da723af9",
        "https://codehs.com/uploads/1e9e24663c05b571ed6d327df5969333",
        "https://codehs.com/uploads/72636065f4deb4d7e414369b95fbb52b",
        "https://codehs.com/uploads/c67e7ee7c395aab13b05ed2c8f86829b",
        "https://codehs.com/uploads/c67e7ee7c395aab13b05ed2c8f86829b",
        "https://codehs.com/uploads/9f80cc1a3ddec9b914f2f4ecbdcb9383",
        "https://codehs.com/uploads/a1975710d699e4e0838f441efb154d65",
        "https://codehs.com/uploads/c9047559678d05bd46f6c181fc4b3cc3",
        "https://codehs.com/uploads/08bf2bf7f05eaf37ccf771c2d9c54fa0"
      ],
      right: [
        "https://codehs.com/uploads/6cfd22be8e8183a16caab024ccded7fc",
        "https://codehs.com/uploads/53c5e6617cb83de555afc9bc90cf7e8e",
        "https://codehs.com/uploads/bdec6e9a6c635b0dae29a819ca129b42",
        "https://codehs.com/uploads/2e4a8e13af709314029f0a98f643abe5",
        "https://codehs.com/uploads/2cc2941128d1c0c191bad03d1a1764e3",
        "https://codehs.com/uploads/71a2fb3781037b218c97e67c1e927f5f",
        "https://codehs.com/uploads/e5d7f9fe318dc6250a172248062cc455",
        "https://codehs.com/uploads/ef66fd9a25471b89a91648e7a0bfc30c",
        "https://codehs.com/uploads/7a748bf381f3c0129bccfc142df34f99"
      ],
      bottom: [
        "https://codehs.com/uploads/54b19dbac23b8404ccefc85bcbf54d8c",
        "https://codehs.com/uploads/5c2f7bb62eedf2669acd05dd938fa578",
        "https://codehs.com/uploads/ac5c7868598a5c3e9500d3f2fc16aea8",
        "https://codehs.com/uploads/ffcfe405054fa07c79b473264eeac0a7",
        "https://codehs.com/uploads/757ef93c233d01458ee361f5f302b028",
        "https://codehs.com/uploads/176f9d74673399dc14b0b8d33d22a3fb",
        "https://codehs.com/uploads/acecadf2b8533a3ec419a7331e727438",
        "https://codehs.com/uploads/63326e6d849ed4b05cb9a26858aa100a",
        "https://codehs.com/uploads/025e73f7283d8a811715453296edec91"
      ],
      left: [
        "https://codehs.com/uploads/0a8f8ae9d90747833a87478df8365976",
        "https://codehs.com/uploads/7069481c1aa1921b765a485869d0c3e2",
        "https://codehs.com/uploads/768253970e1b6c9f8559221ff8a331fe",
        "https://codehs.com/uploads/31ac32c31017b8cb5c9402efcef3ead4",
        "https://codehs.com/uploads/08924cedd4a1de531ce5d9633f0689f0",
        "https://codehs.com/uploads/62c9479c05caaaf84f8766a758e9d86f",
        "https://codehs.com/uploads/ed482cb1e76619ee80fc038f019eb4c8",
        "https://codehs.com/uploads/2e8a74f2722afd54839a0ea8d928305c",
        "https://codehs.com/uploads/526ebafe3abe68cf44388ef4a64d23ea"
      ],
      outerTopLeft: [
        "https://codehs.com/uploads/0c7cbe94a28c1b53d47293b5ca35e4bc",
        "https://codehs.com/uploads/882809752efa3d7bc60c3290ccd7c8d9",
        "https://codehs.com/uploads/c9206ef8baf57651c1c0f906adf7dbe5",
        "https://codehs.com/uploads/7bc6b06082323e35ce013d13a3cd1e8c",
        "https://codehs.com/uploads/94aa8e409498c294d450d0d8e280324c",
        "https://codehs.com/uploads/11c70a28853eac0b5f46b4513dccf37e",
        "https://codehs.com/uploads/709769e0831b4e2070fec6fe7a34e83a",
        "https://codehs.com/uploads/726f5ab99e80826ac4b057b2cb9d077f",
        "https://codehs.com/uploads/804bc122e5064a830dcceb2741a38093"
      ],
      outerTopRight: [
        "https://codehs.com/uploads/e6e1d244e9b92037ee12c3238cf45da1",
        "https://codehs.com/uploads/85862de195e984bb126e330b742cc0db",
        "https://codehs.com/uploads/0f87e9dc565bca1a7b1552c853fc6cae",
        "https://codehs.com/uploads/485a62692ae328cb9fb1b641cdaf005b",
        "https://codehs.com/uploads/9433cda339567d7d41864143f8e6f01c",
        "https://codehs.com/uploads/c7ea9c6f81e9632d34003808839fc563",
        "https://codehs.com/uploads/5f912f86eccfa50a7a9a5a6a50d1ff92",
        "https://codehs.com/uploads/e83023879277c494b458ad09e47433bf",
        "https://codehs.com/uploads/5b3e500261c953dc5934261cbf9f8d4d"
      ],
      outerBottomLeft: [
        "https://codehs.com/uploads/72fae631046d11f12dedf9ea970569a3",
        "https://codehs.com/uploads/6ae117b3db35bcdb18d4707dd9f5e666",
        "https://codehs.com/uploads/0a4c8ccdf0740d87be584a32f201e1b2",
        "https://codehs.com/uploads/69cf07b52ce88a4b680e0ae78424c0bd",
        "https://codehs.com/uploads/c543c83a246278c8eb59dc2ee08de115",
        "https://codehs.com/uploads/a9c040fd51093075d85ae175935de6a4",
        "https://codehs.com/uploads/25b92bae28f11caaa36ec0c9c64894dd",
        "https://codehs.com/uploads/720b04cd8cee62ea76a1e0b342c39d45",
        "https://codehs.com/uploads/9e51228563febc6d33f2f6fc0d55cafd"
      ],
      outerBottomRight: [
        "https://codehs.com/uploads/ecf335e578eb9c035679ff0732c9e28f",
        "https://codehs.com/uploads/6fdfb2109540f3c2bb4cef18adb05e3d",
        "https://codehs.com/uploads/da54816d5fa786694b7d1e409ac7c738",
        "https://codehs.com/uploads/4fc2cf17fdd6d19badcedf2a21c99fe3",
        "https://codehs.com/uploads/2ed3869b57a150651fcbf93d3080c7fb",
        "https://codehs.com/uploads/d11fd8561792690d8be354c78fe1e386",
        "https://codehs.com/uploads/88cdf013450446fc70774d1a2dac06b5",
        "https://codehs.com/uploads/a6241980b60f8e9eb484c183e00d779f",
        "https://codehs.com/uploads/3f8c8e0e59c82a15e99bd1473663b0af"
      ],
      innerTopLeft: [
        "https://codehs.com/uploads/a0032ed17b4215a586366774389adb49",
        "https://codehs.com/uploads/565a33021dbef4f5dc8f0a652f8df6f3",
        "https://codehs.com/uploads/53db3bfddaee29b1fd681924126d776d",
        "https://codehs.com/uploads/65a57f75440d3f753c5f4478bf9836ea",
        "https://codehs.com/uploads/e6eb252b8001316199c03a2d16e5f13f",
        "https://codehs.com/uploads/09bffac1e47bb0af72da387e5fc416d6",
        "https://codehs.com/uploads/cf0e90fce9b9bda5c60b3f81bfc45792",
        "https://codehs.com/uploads/8b29954136c902d9f4371eff5df67101",
        "https://codehs.com/uploads/03eb614ff80b735b0ae23d8922029076"
      ],
      innerTopRight: [
        "https://codehs.com/uploads/9145aa74f9fc59f53c76aaf315bae8a0",
        "https://codehs.com/uploads/4d109f8fa7da64624beddf05333426aa",
        "https://codehs.com/uploads/3f6ef679d60043b367c31fbafa1f55e3",
        "https://codehs.com/uploads/f9a42f9fa4d37ca7131cf2e3732781d7",
        "https://codehs.com/uploads/344f27bf25ffa643172834484ab52931",
        "https://codehs.com/uploads/5dd21af72fc9c269da0aba511296cbf1",
        "https://codehs.com/uploads/15a51e33d425bc760acc26c4376b85da",
        "https://codehs.com/uploads/344f27bf25ffa643172834484ab52931",
        "https://codehs.com/uploads/7c3fd36448e3bbf24cf41829111f4e50"
      ],
      innerBottomLeft: [
        "https://codehs.com/uploads/4997d798dc301d5ccec5cd2fdefe6258",
        "https://codehs.com/uploads/1402ccc352a0e0cc304983cff0fc3c87",
        "https://codehs.com/uploads/26a47216fd578944d7aaa999402cdffc",
        "https://codehs.com/uploads/b3637c4038d58546d1b01f0bef86d8d2",
        "https://codehs.com/uploads/498aa951b06490855d7e9741fe8d9a97",
        "https://codehs.com/uploads/0c5b42e53ef52053bd1cd9b1967a091a",
        "https://codehs.com/uploads/7194fc06c9627236a0a1efba617bc94e",
        "https://codehs.com/uploads/8a8952e44a6b3976d65596cbb1a7a9c8",
        "https://codehs.com/uploads/fbacc0c6158a327f5649848904226d99"
      ],
      innerBottomRight: [
        "https://codehs.com/uploads/d0f5551b648c0185e9f51d70b4a47e61",
        "https://codehs.com/uploads/4421f06e38f21de4f05461849ee284ab",
        "https://codehs.com/uploads/40eb4ae2f4af1e65169f87f129ed251d",
        "https://codehs.com/uploads/515ac5c042e9416f6c9f59f8032a1343",
        "https://codehs.com/uploads/7116457dbc2ffa02b8ce0f5bd6b7d3a2",
        "https://codehs.com/uploads/57a3f79758067f0706616349be67de02",
        "https://codehs.com/uploads/207b1e786e26d7f6b6ed97c3b8b45778",
        "https://codehs.com/uploads/44fb9231d969b0406cbbbd005501b36b",
        "https://codehs.com/uploads/e3803651c0f9e9c50b2f5dcc097c9874"
      ]
    },
    grass_water: {
      top: [
        "https://codehs.com/uploads/ee19b844215313a361ee1339eb6a44c5",
        "https://codehs.com/uploads/f12044f61b12416d36c3e019eb1f3ab9",
        "https://codehs.com/uploads/051f13ba696cba5d3721976d76dc719c",
        "https://codehs.com/uploads/86983ab6f18325468fddc1d8c29c0ce9",
        "https://codehs.com/uploads/dae0e7612b2b0c72ac708ca1b934f389",
        "https://codehs.com/uploads/a7a0bad723cc2b0f197648d734ce8f85",
        "https://codehs.com/uploads/6bd9fa01f2a85f8ef0a935a2fe2f0a84",
        "https://codehs.com/uploads/54fdfad37dd75327066a7cf46635fb23",
        "https://codehs.com/uploads/fefb114ad9f97b4171b622562b08f706"
      ],
      right: [
        "https://codehs.com/uploads/d8fec8f118e5d48dc333e4e1fe50ffc7",
        "https://codehs.com/uploads/2a49f627a6eec80ab40ebff41a6912a0",
        "https://codehs.com/uploads/a32a289f6eabada7284e4696759183c6",
        "https://codehs.com/uploads/c794bbdc06ceccbae7768802f2c39f84",
        "https://codehs.com/uploads/765353221b727d018aaafdc41935d738",
        "https://codehs.com/uploads/22c365d5a61e663ac6c6e465c065e59f",
        "https://codehs.com/uploads/c27b4315013d257f94bb4cdc1fa29678",
        "https://codehs.com/uploads/cbc1664a4a5cb62683d60d0231434eeb",
        "https://codehs.com/uploads/be146b62f8a98898b19a7f42f4e34c2e"
      ],
      bottom: [
        "https://codehs.com/uploads/2ba3bec500388ae6755c4e8928a6c576",
        "https://codehs.com/uploads/9ae714770bde1b0abc730767a297be94",
        "https://codehs.com/uploads/9e9913a09f1ad92d5a6a85b313fb59fb",
        "https://codehs.com/uploads/0cc92941829b2ba3e28c943f58f44db5",
        "https://codehs.com/uploads/1081f99fa8449363e2fbfd4774e3dfbb",
        "https://codehs.com/uploads/75b8fc6306032fd902d1ea35cf5a4529",
        "https://codehs.com/uploads/82ffbd5ffea540a4709593a2dbc3562d",
        "https://codehs.com/uploads/37233acd31d1e97e672ea08368d0f74d",
        "https://codehs.com/uploads/1776c04d497bd4d2b4d137c0adcbdf95"
      ],
      left: [
        "https://codehs.com/uploads/d142090a88077ec6905206fe6d1b3455",
        "https://codehs.com/uploads/3ffbf2f755c96959a290c288a8e4f963",
        "https://codehs.com/uploads/213456310c6f24a04822512ffbc31856",
        "https://codehs.com/uploads/618dc19914235661692852c55c931ec6",
        "https://codehs.com/uploads/fb5a2011e4e60d1c43dc72f12ce9aae3",
        "https://codehs.com/uploads/65c36743ec0293eee5fc5b7d92332473",
        "https://codehs.com/uploads/bdf861428343194ab02923020684728b",
        "https://codehs.com/uploads/c3209a891b41824da12b8856dcab985b",
        "https://codehs.com/uploads/fa4895db1e108d568bb43353255941fd"
      ],
      outerTopLeft: [
        "https://codehs.com/uploads/5b0faff5018da6d74e29d9ccd026886a",
        "https://codehs.com/uploads/116be5ff3745471ae8b90e1be72a221a",
        "https://codehs.com/uploads/38b2524621f562bf831e97e3e21e6075",
        "https://codehs.com/uploads/83a0fb64bf3fb068d5481353baa5caa3",
        "https://codehs.com/uploads/bb0edd9c2a1cff244db26dc4e65cfdea",
        "https://codehs.com/uploads/071d89b6b422707d4e5f507953e0c168",
        "https://codehs.com/uploads/6aa3b93986c35b0557bc6078cc5c5d78",
        "https://codehs.com/uploads/e19e769046245bbb5ad46bf6b8bdffb5",
        "https://codehs.com/uploads/f141af29c22f398afe360e3552dddaef"
      ],
      outerTopRight: [
        "https://codehs.com/uploads/1ee050a7ebfd2235e5257eb08cd05d46",
        "https://codehs.com/uploads/f459adb51aebb80c823e9569c642de54",
        "https://codehs.com/uploads/02f9a28fd6fba908584b9c46015a0f16",
        "https://codehs.com/uploads/1f804549ac83e822332df46171e57587",
        "https://codehs.com/uploads/774ca1bc2345eebfe13ee14ea530c723",
        "https://codehs.com/uploads/9d7fc8b67bbd6f93e087c03f88fe0076",
        "https://codehs.com/uploads/7db65cb7d23860603b7181da2dd7dbb6",
        "https://codehs.com/uploads/9eca86bed64019b798e89113205e3990",
        "https://codehs.com/uploads/614fdea31ac44a8414ff6821d5f4be13"
      ],
      outerBottomLeft: [
        "https://codehs.com/uploads/8b34110d4b1c7638022c8a679074c003",
        "https://codehs.com/uploads/e403254fc9689a8dd532b2ab11a3e446",
        "https://codehs.com/uploads/12132975704869286e84af233bd5928f",
        "https://codehs.com/uploads/8ca21b182e6a6c4f7919af6915314633",
        "https://codehs.com/uploads/f1528b2fd083a51c7e51d1718df87630",
        "https://codehs.com/uploads/03e91a9b7d4293748dfa2fbf8a77170b",
        "https://codehs.com/uploads/dfa0e8c21d346a2b9009b654f82e9e0c",
        "https://codehs.com/uploads/29f7ee2e6570bc1fdad6c1af5ab8b517",
        "https://codehs.com/uploads/fc96e788f0b5242ce1b6adc0bd523955"
      ],
      outerBottomRight: [
        "https://codehs.com/uploads/9a91bff9dced3a48cc58559e843aac4c",
        "https://codehs.com/uploads/08b5e4c7b6a6b932a69902a1b8eda403",
        "https://codehs.com/uploads/f269a10d2dd40862d005ae49edaf4294",
        "https://codehs.com/uploads/c6e24567789dc354a3e67178b1635e7e",
        "https://codehs.com/uploads/4a482d49879715a65e35bcb8cf5e6243",
        "https://codehs.com/uploads/0c42a798c407898cf468c703a4be53d6",
        "https://codehs.com/uploads/8ada748418821aeb2f19a496acc93218",
        "https://codehs.com/uploads/38b0c160c8d09fce7374b043bdf4e0ca",
        "https://codehs.com/uploads/4a708be5353a35dc9c41ad195bfd8f75"
      ],
      innerTopLeft: [
        "https://codehs.com/uploads/1574dae9d03a924bbb092551a4091de4",
        "https://codehs.com/uploads/27ed8566a0359c73ab291ce44992dc15",
        "https://codehs.com/uploads/c8ea4b43e46899954ce853ac471dcc52",
        "https://codehs.com/uploads/7df730b508a6e68c4cb4e1c6fcf7d85a",
        "https://codehs.com/uploads/61d8fbc89d782d02a5056aad22588a0f",
        "https://codehs.com/uploads/594d9c7bdcb05c07ed21d57fad3f152a",
        "https://codehs.com/uploads/5c7cffe7523791abbb5d4a39098a4474",
        "https://codehs.com/uploads/23727eb90fc63abfa8082d664033793e",
        "https://codehs.com/uploads/004fa4d6cb63447756fdf26e82cc464d"
      ],
      innerTopRight: [
        "https://codehs.com/uploads/d3039ffdc0ba3324d49460321d287972",
        "https://codehs.com/uploads/35f1af34ec27c4ca4b936a9e8bb0a924",
        "https://codehs.com/uploads/2a14e26f9e0ab00487ef3f6eddb799a6",
        "https://codehs.com/uploads/49ce8de8bcb3819869915960cb7c979c",
        "https://codehs.com/uploads/ccabd2adffeb192217311d62683af863",
        "https://codehs.com/uploads/9627ab85eb16371827eb758199003406",
        "https://codehs.com/uploads/4410fde59cbb2836b340d77743d16722",
        "https://codehs.com/uploads/559a94da32c2d57bceeb73633e070997",
        "https://codehs.com/uploads/90357ec315d2057aef7acda398933015"
      ],
      innerBottomLeft: [
        "https://codehs.com/uploads/a4e121428d518d05927a45fc66f142d3",
        "https://codehs.com/uploads/a27804ea5f0ae512d51dee84d7cd40fc",
        "https://codehs.com/uploads/fea1d85cc613520ce77dcee16c042f35",
        "https://codehs.com/uploads/e0ef00c325daba1d1b2fd1e8d1bfc044",
        "https://codehs.com/uploads/37ee6adfda5ae4fe01a62d7e5544fc6f",
        "https://codehs.com/uploads/3d0d4959d7b6b6c0aa20a8603393755e",
        "https://codehs.com/uploads/447b00a42ee315a466333186f0445728",
        "https://codehs.com/uploads/22899a64a4409d0a4e3d499ecfec735a",
        "https://codehs.com/uploads/3c9e58fad949bd4d38998bcb2d8d9f0e"
      ],
      innerBottomRight: [
        "https://codehs.com/uploads/125c2891f663059e5c0b2bdb0684d009",
        "https://codehs.com/uploads/473243d4e4191b4725eb61461db1601f",
        "https://codehs.com/uploads/a4682e0d7c6b28d65fec63e4b5616f14",
        "https://codehs.com/uploads/f4d2a9b324731c4157d6da170428c5b7",
        "https://codehs.com/uploads/41bf79a7b0a10045748c6b75cc996f1e",
        "https://codehs.com/uploads/2992c8283e8390afd6c7af649f2ed2ba",
        "https://codehs.com/uploads/404c95cca03676cd4b360f8157479c2b",
        "https://codehs.com/uploads/a20b2b76fde298b78f332f37244ba610",
        "https://codehs.com/uploads/ffe23191e12cd185841978133662b8ec"
      ]
    },
    forest_water: {
      top: [
        "https://codehs.com/uploads/7fc7f39da4aa127ecc84d14a040587a0",
        "https://codehs.com/uploads/1b20f27a2aa86388590d9cd7413a9f46",
        "https://codehs.com/uploads/3950e22304b9b4a2e6bd0596b0480619",
        "https://codehs.com/uploads/599d16092543ad6c97a82b70dcdc3bf8",
        "https://codehs.com/uploads/95362b631c524d96a2342ed847f6e899",
        "https://codehs.com/uploads/801ceed523ace107097315aa8a6f5533",
        "https://codehs.com/uploads/53e8dc35fc575f0cf79f09d0a8338c6e",
        "https://codehs.com/uploads/1fde4c01180680d9f90beea69d04e277",
        "https://codehs.com/uploads/018d13c0cff4d8cb1ed41140c07cd307"
      ],
      right: [
        "https://codehs.com/uploads/01b455228aae7e6325c2eb28998f6d62",
        "https://codehs.com/uploads/e436fe201f67dc6e8ce4348ce546fd12",
        "https://codehs.com/uploads/341754b00dae41ff253c38a777928cd5",
        "https://codehs.com/uploads/0ce055cb09ebf3994600f3619b7bea33",
        "https://codehs.com/uploads/b71d9464c876f2d826c47650b7a6ea4c",
        "https://codehs.com/uploads/917a81ab1ff7d6097ac0ccf077098d58",
        "https://codehs.com/uploads/d9f02baef21f3fcf2e1197dbd76c940e",
        "https://codehs.com/uploads/82568139bffe664e4dde8c5cdbe6e430",
        "https://codehs.com/uploads/cd8947738736e94b744eda7c95157f94"
      ],
      bottom: [
        "https://codehs.com/uploads/67bf7d0f64216fccfb66d887caf1aab5",
        "https://codehs.com/uploads/5cfc91dec6612eaf62e265183426daa8",
        "https://codehs.com/uploads/971fc5390fbe7f53eba87dde98957e82",
        "https://codehs.com/uploads/2638b1bcceea80a7ee0237894b15c3e4",
        "https://codehs.com/uploads/70828bfe599cc1415c53e3b503ff61d2",
        "https://codehs.com/uploads/d36bf990eb7ca4999a832644a4b3f8e8",
        "https://codehs.com/uploads/94318676df2113f6287293a5fa52be7b",
        "https://codehs.com/uploads/13edb5893057a0643a6b89e3cc696ce0",
        "https://codehs.com/uploads/5e6364c4b0270070d1b35194cfe85f6a"
      ],
      left: [
        "https://codehs.com/uploads/8bb9e00a949b41e1f98beffd4f6f321e",
        "https://codehs.com/uploads/08d5fabd38e3f421d7b4a570e6e40a2e",
        "https://codehs.com/uploads/114aa670afa31a8e5d52ab3fa3df5440",
        "https://codehs.com/uploads/7de197e47fd78f2378a62383ab2d2738",
        "https://codehs.com/uploads/e7d27e852ed6ceb9724cea0cadc453b0",
        "https://codehs.com/uploads/55e1479cc7cf0c17dad620a708b9c49b",
        "https://codehs.com/uploads/67f08b790f30263d89de4ea0d7e631f7",
        "https://codehs.com/uploads/aa157f87b7af227443d983d9f85dfed5",
        "https://codehs.com/uploads/1fdb66f989d2a91e3a515091a4f39703"
      ],
      outerTopLeft: [
        "https://codehs.com/uploads/2b3fed769b686c6d1cfd776d631bc81d",
        "https://codehs.com/uploads/1ba4fbfb7422253d70fdd0158ae5a307",
        "https://codehs.com/uploads/ced27f13e47a0cac9fb58c448c799591",
        "https://codehs.com/uploads/6a7ba69a6bcc0ea6141e46aad1bdf1ec",
        "https://codehs.com/uploads/a80e4bf6118b388c4db26e14aee4752a",
        "https://codehs.com/uploads/38ba0e9a58d1bd44128f21f0d4510afd",
        "https://codehs.com/uploads/d8b93e7ae0a960f75f8dc12b709c30d9",
        "https://codehs.com/uploads/2bd07e881ea31ffc2a67817da843d80a",
        "https://codehs.com/uploads/a7f645324fa79dc7bb325c6da9c6518f"
      ],
      outerTopRight: [
        "https://codehs.com/uploads/db21b2cff5e64a78606c650a27f19f89",
        "https://codehs.com/uploads/66a0f74e83c24b19a08e28333b3808d9",
        "https://codehs.com/uploads/cb5596203b42e3cf230c42875eaba212",
        "https://codehs.com/uploads/fe55ae72c35a38a9c91ea76068a32ec4",
        "https://codehs.com/uploads/ec678f498f245a86ccf0af30d463fde9",
        "https://codehs.com/uploads/00df6f2381f2e4e3b4c3c46d6f0e559e",
        "https://codehs.com/uploads/3a1cc3a3149205907d93a1f1073fc819",
        "https://codehs.com/uploads/1a2372240d8ab5918c8670c1a6821c01",
        "https://codehs.com/uploads/d86bf64a589e4d05856cb41c66766f4d"
      ],
      outerBottomLeft: [
        "https://codehs.com/uploads/3db16cba46022b42ecf9c0396df5f2ee",
        "https://codehs.com/uploads/5944edd02ce656aa5d08b7030cb69a16",
        "https://codehs.com/uploads/f4235c96a01b2ea07807218dd58be842",
        "https://codehs.com/uploads/8bda5a559ba4ea813f5c18c958cee864",
        "https://codehs.com/uploads/5f095d28f1eb66938f4d9e998fff5901",
        "https://codehs.com/uploads/61d852f24d9cbf7685273a1b13d8ea44",
        "https://codehs.com/uploads/72bdffba59c6e1cd53ecbf80fd7ff1ec",
        "https://codehs.com/uploads/d43c3e468a3af37a4153be83451a92c8",
        "https://codehs.com/uploads/d43c3e468a3af37a4153be83451a92c8"
      ],
      outerBottomRight: [
        "https://codehs.com/uploads/015df493cbf47e329d623f97838de9d0",
        "https://codehs.com/uploads/4aa1f409510d476c3b58466ebbc9ac10",
        "https://codehs.com/uploads/76355f57315244ca752ffde89a05dabd",
        "https://codehs.com/uploads/45f28264073ef318907b17f2e02ccb23",
        "https://codehs.com/uploads/cb2bf9b6a91eb7cd893af5a5b4ec3aba",
        "https://codehs.com/uploads/e8946943e648d4d4c9a4ec3fd53bb240",
        "https://codehs.com/uploads/df3db07a8e2e6d1135bda03f5cc4992f",
        "https://codehs.com/uploads/73f9112ea50719ef7e77e253116388cf",
        "https://codehs.com/uploads/51b371090f5bbdb275dd3d7e5957a1e7"
      ],
      innerTopLeft: [
        "https://codehs.com/uploads/8e0a9aecadcc1c28361a7c12373169ca",
        "https://codehs.com/uploads/513ab6a34ac2e2743fce925ac4d2c443",
        "https://codehs.com/uploads/ecf0541b5fad1220f9aed7d52be74713",
        "https://codehs.com/uploads/5fd7828bde2a8109d212d333f1fc79bf",
        "https://codehs.com/uploads/84c881f4c2095f4f90efa1cf8f343302",
        "https://codehs.com/uploads/a9c833ae08e2c73e6e5efcbd5110a2e8",
        "https://codehs.com/uploads/f3591bb77272adf8b7902477b4cddb8e",
        "https://codehs.com/uploads/418288853455d620d0d15b55dda8d881",
        "https://codehs.com/uploads/5c7ef6d0834f81e88447c7f81ba5b5fb"
      ],
      innerTopRight: [
        "https://codehs.com/uploads/4b5fb4efefffe0220bdbfe4695798c42",
        "https://codehs.com/uploads/59bca21b586c797097b6bd900a9f4710",
        "https://codehs.com/uploads/a3cc287455fd086c699a41d697209408",
        "https://codehs.com/uploads/f34bffb62a343f27a49acc7f10cbad1b",
        "https://codehs.com/uploads/7ddad543b28158d967698aec050cd85c",
        "https://codehs.com/uploads/98aae3dc339ac2949b0b7e7a7afe38f5",
        "https://codehs.com/uploads/db4d41bb23d25c140965ad1d060d8544",
        "https://codehs.com/uploads/09f330731d54de13a02b1eab7fa72791",
        "https://codehs.com/uploads/3314f59935a871e953aeda897b38097f"
      ],
      innerBottomLeft: [
        "https://codehs.com/uploads/210d78d77b5b779cf4e42e73439a664a",
        "https://codehs.com/uploads/dbb06e4b0966a7596919f4bdb5c22a7c",
        "https://codehs.com/uploads/14c25691c331ef0af718f8c4c30e2c32",
        "https://codehs.com/uploads/caa811f8bf94cd88bde74803f39b14e6",
        "https://codehs.com/uploads/8480b3f23342212eb6541abb965e78de",
        "https://codehs.com/uploads/4dc83b9bed78d6135784b49d21e7d4db",
        "https://codehs.com/uploads/ccbde2ed1d6c3ed3e04abb589398da0a",
        "https://codehs.com/uploads/24f174666e14dd90f029045e28566b1b",
        "https://codehs.com/uploads/8cc48c433cadac8161c6ef47105de6b2"
      ],
      innerBottomRight: [
        "https://codehs.com/uploads/7e2e6ed800cc650c0fc9ac6069c91046",
        "https://codehs.com/uploads/0aa617485c5c9722eb44005d7430f9f6",
        "https://codehs.com/uploads/1c7b7e92d68279c9055decf5245f90a0",
        "https://codehs.com/uploads/b1b49475f5bddb1559e0d40a8af443a2",
        "https://codehs.com/uploads/186d042d8ed6606a82d7836d838a9225",
        "https://codehs.com/uploads/f72166d74c0add7f8f4fdc4cde42ab4c",
        "https://codehs.com/uploads/0a3625a975ffc92efe62313d4ea94875",
        "https://codehs.com/uploads/ce4646f6b15b8d02f1121e7f404fe87e",
        "https://codehs.com/uploads/324afca34d38ad6f9fce29619064a0f6"
      ]
    }
  }
};

export class GameEngine {
  public container: HTMLDivElement;
  public onStateChange: (state: GameState) => void;

  public playerEl: HTMLImageElement;
  public testBoxEl: HTMLDivElement;

  private missionPopupTimer: any = null;
  private deathTimeout: any = null;
  private hitFlashTimeout: any = null;
  private playingSounds: { url: string; audio: HTMLAudioElement }[] = [];
  private animationId: number = 0;

  // Cache door frame images
  private _doorFrameCache: HTMLImageElement[];
  private _explosionFrameCache: HTMLImageElement[];
  private _multishotFireFrameCache: HTMLImageElement[];

  public bgCanvas: HTMLCanvasElement | null = null;
  public bgCtx: CanvasRenderingContext2D | null = null;
  public biomeGrid: string[][] = [];
  public gridCols = 120;
  public gridRows = 120;
  public tileSize = 64;
  private textureCache: Record<string, HTMLImageElement> = {};
  private biomeSeedT = Math.random() * 10000;
  private biomeSeedM = Math.random() * 10000;
  private biomeSeedL = Math.random() * 10000;
  private biomeCache: Map<string, string> = new Map();
  private rawBiomeCache: Map<string, string> = new Map();

  public state: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    mouseX: number;
    mouseY: number;
    keys: Record<string, boolean>;
    bullets: Bullet[];
    enemyBullets: EnemyBullet[];
    enemies: Enemy[];
    shieldBullets: ShieldBullet[];
    explosions: Explosion[];
    particles: GameParticle[];
    acceleration: number;
    friction: number;
    bulletSpeed: number;
    bulletSize: number;
    fireRate: number;
    fireDelay: number;
    bulletPierce: number;
    multishot: number;
    fireshot: number;
    shield: number;
    lastShot: number;
    shieldRespawnTimer: number;
    centerOffsetX: number;
    centerOffsetY: number;
    cameraX: number;
    cameraY: number;
    coins: number;
    lives: number;
    maxLives: number;
    lastHitTime: number;
    playerAnimTimer: number;
    playerAnimFrame: number;
    activePlaytime: number;
    lastTimestamp: number;
    lastFrameTime: number;
    gameSessionId: number;
    activeMissions: any[];
    completedMissions: string[];
    inShop: boolean;
    enteringShop: boolean;
    shopVisits: number;
    shopItemEls: { el: HTMLDivElement; enchantId: string; x: number; y: number }[];
    shopTitleEl: HTMLDivElement | null;
    shopEntranceActive: boolean;
    shopEntranceEl: HTMLImageElement | null;
    shopExitEl: HTMLImageElement | null;
    shopEnterTime: number;
    shopFade: number;
    lastShopArrowBeepTime: number;
    missionProgress: { visible: boolean; text: string; progress: number; target: number };
    shopArrowEl: HTMLImageElement | null;
    shopArrowTextEl: HTMLDivElement | null;
    shopArrowFade: number;
    shopArrowAnimFrame: number;
    shopArrowAnimTimer: number;
    entranceDoorAnimFrame: number;
    entranceDoorAnimPlayed: boolean;
    entranceDoorAnimTimer: number;
    exitDoorAnimFrame: number;
    exitDoorAnimPlayed: boolean;
    exitDoorAnimTimer: number;
    postShopSpawnDelay: boolean;
    shopEntranceX: number;
    shopEntranceY: number;
    shopExitX: number;
    shopExitY: number;
    preShopX: number;
    preShopY: number;
    shopUnlockMissions: { id: string; desc: string; target: number }[];
    shopMissionCounter: number;
    shopMissionTier: number;
    usedMissionIds: Record<number, string[]>;
    enchantmentLevels: Record<string, number>;
    shopOverlayVisible: boolean;
    shopMusic: HTMLAudioElement | null;
    lastSpawnTime: number;
    nextSpawnInterval: number;
    currentMusic: HTMLAudioElement | null;
    worldMusicVolume: number;
    shopMusicVolume: number;
    sfxVolume: number;
    maxParticles: number;
    waterAnimOffset: number;
    screenScale: number;
    gameStarted: boolean;
    isDead: boolean;
    isPaused: boolean;
    devUnlocked: boolean;
    showDevPassword: boolean;
    missionPopup: { title: string; desc: string; visible: boolean };
    hitFlash: boolean;
    showDeathScreen: boolean;
    deathMessage: string;
    scoreMessage: string;
    mobKills: Record<string, number>;
    enemiesPopupVisible: boolean;
  };

  constructor(container: HTMLDivElement, onStateChange: (state: GameState) => void) {
    this.container = container;
    this.onStateChange = onStateChange;

    this.bgCanvas = document.createElement('canvas');
    this.bgCanvas.id = 'biome-background';
    this.bgCanvas.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;image-rendering:pixelated;';
    this.container.appendChild(this.bgCanvas);
    this.bgCtx = this.bgCanvas.getContext('2d');

    this.state = {
      x: 900, y: 400, vx: 0, vy: 0, mouseX: 0, mouseY: 0, keys: {},
      bullets: [], enemyBullets: [], enemies: [], shieldBullets: [], explosions: [], particles: [],
      acceleration: DEFAULTS.ACCELERATION, friction: DEFAULTS.FRICTION,
      bulletSpeed: DEFAULTS.BULLET_SPEED, bulletSize: DEFAULTS.BULLET_SIZE,
      fireRate: DEFAULTS.FIRE_RATE, fireDelay: 1000 / DEFAULTS.FIRE_RATE,
      bulletPierce: DEFAULTS.PIERCE, multishot: DEFAULTS.MULTISHOT,
      fireshot: DEFAULTS.FIRESHOT, shield: DEFAULTS.SHIELD,
      lastShot: 0, shieldRespawnTimer: 0,
      centerOffsetX: 36, centerOffsetY: 21, cameraX: 0, cameraY: 0,
      coins: 0, lives: DEFAULTS.LIVES, maxLives: DEFAULTS.MAX_LIVES, lastHitTime: 0,
      playerAnimTimer: 0, playerAnimFrame: 0,
      activePlaytime: 0, lastTimestamp: Date.now(), lastFrameTime: performance.now(),
      gameSessionId: 0,
      activeMissions: [], completedMissions: [],
      inShop: false, enteringShop: false, shopVisits: 0, shopItemEls: [], shopTitleEl: null,
      shopEntranceActive: false, shopEntranceEl: null, shopExitEl: null, shopEnterTime: 0, shopFade: 0, lastShopArrowBeepTime: 0,
      missionProgress: { visible: false, text: '', progress: 0, target: 0 },
      shopArrowEl: null, shopArrowTextEl: null, shopArrowFade: 0, shopArrowAnimFrame: 0, shopArrowAnimTimer: 0,
      entranceDoorAnimFrame: 0, entranceDoorAnimPlayed: false, entranceDoorAnimTimer: 0,
      exitDoorAnimFrame: 0, exitDoorAnimPlayed: false, exitDoorAnimTimer: 0,
      postShopSpawnDelay: false,
      shopEntranceX: 0, shopEntranceY: 0, shopExitX: 0, shopExitY: 0, preShopX: 0, preShopY: 0,
      shopUnlockMissions: [], shopMissionCounter: 0,
      shopMissionTier: 1, usedMissionIds: { 1: [], 2: [], 3: [], 4: [] },
      enchantmentLevels: {}, shopOverlayVisible: false, shopMusic: null,
      lastSpawnTime: 0, nextSpawnInterval: 2500,
      currentMusic: null, worldMusicVolume: 0.3, shopMusicVolume: 0.3, sfxVolume: 0.5, maxParticles: DEFAULTS.MAX_PARTICLES,
      waterAnimOffset: parseInt(localStorage.getItem('waterAnimOffset') || '0', 10),
      screenScale: 1,
      gameStarted: false, isDead: false, isPaused: false,
      devUnlocked: false, showDevPassword: false,
      missionPopup: { title: '', desc: '', visible: false },
      hitFlash: false, showDeathScreen: false, deathMessage: '', scoreMessage: '',
      mobKills: {}, enemiesPopupVisible: false,
    };

    this.playerEl = document.createElement('img');
    this.playerEl.src = PLAYER_SPRITES[0];
    this.playerEl.style.cssText = 'width:72px;height:42px;position:absolute;transform-origin:center;visibility:hidden;z-index:9999;pointer-events:none;user-select:none;-webkit-user-select:none;-webkit-user-drag:none;';
    this.playerEl.draggable = false;
    this.playerEl.setAttribute('draggable', 'false');
    this.playerEl.addEventListener('dragstart', e => e.preventDefault());
    this.container.appendChild(this.playerEl);

    this._doorFrameCache = DOOR_ANIM_FRAMES.map(url => { const img = new Image(); img.src = url; return img; });
    this._explosionFrameCache = BOMBER_EXPLOSION_FRAMES.map(url => { const img = new Image(); img.src = url; return img; });
    this._multishotFireFrameCache = [];
    Object.values(PLAYER_MULTISHOT_FIRE_ANIMS).forEach(frames => {
      frames.forEach(url => {
        const img = new Image();
        img.src = url;
        this._multishotFireFrameCache.push(img);
      });
    });

    this.testBoxEl = document.createElement('div');
    this.testBoxEl.style.cssText = 'width:50px;height:50px;background:gold;position:absolute;visibility:hidden;pointer-events:none;';
    this.container.appendChild(this.testBoxEl);
    this.applyScreenScale();

    this.update = this.update.bind(this);
    this.resumeMusic = this.resumeMusic.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.preventNativeDrag = this.preventNativeDrag.bind(this);
    this.preventBrowserZoom = this.preventBrowserZoom.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.animationId = requestAnimationFrame(this.update);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('click', this.resumeMusic);
    document.addEventListener('contextmenu', this.handleContextMenu, true);
    document.addEventListener('dragstart', this.preventNativeDrag, true);
    document.addEventListener('selectstart', this.preventNativeDrag, true);
    document.addEventListener('wheel', this.preventBrowserZoom, { capture: true, passive: false });
    document.addEventListener('keydown', this.preventBrowserZoom, true);
    document.addEventListener('gesturestart', this.preventBrowserZoom, true);
    document.addEventListener('gesturechange', this.preventBrowserZoom, true);
    document.addEventListener('gestureend', this.preventBrowserZoom, true);
    window.addEventListener('blur', this.handleBlur);
    window.addEventListener('resize', this.handleResize);
    this.preloadAllTextures();
    this.emitState();
  }

  public emitState() {
    const s = this.state;
    this.onStateChange({
      gameStarted: s.gameStarted, isPaused: s.isPaused, isDead: s.isDead,
      devUnlocked: s.devUnlocked, showDevPassword: s.showDevPassword,
      lives: s.lives, maxLives: s.maxLives, coins: s.coins,
      worldMusicVolume: Math.round(s.worldMusicVolume * 100), shopMusicVolume: Math.round(s.shopMusicVolume * 100), sfxVolume: Math.round(s.sfxVolume * 100), maxParticles: s.maxParticles,
      waterAnimOffset: s.waterAnimOffset,
      deathMessage: s.deathMessage, scoreMessage: s.scoreMessage,
      hitFlash: s.hitFlash, showDeathScreen: s.showDeathScreen, shopFade: s.shopFade,
      inShop: s.inShop, shopOverlayVisible: s.shopOverlayVisible,
      enchantmentLevels: { ...s.enchantmentLevels },
      missionProgress: { ...s.missionProgress }, missionPopup: { ...s.missionPopup },
      shopMissions: s.shopUnlockMissions.map(sm => ({ desc: sm.desc, target: sm.target, progress: s.activeMissions.find(m => m.id === sm.id)?.progress || 0, done: s.completedMissions.includes(sm.id) })),
      devValues: { acceleration: s.acceleration, friction: s.friction, bulletSpeed: s.bulletSpeed, bulletSize: s.bulletSize, fireRate: s.fireRate, bulletPierce: s.bulletPierce, multishot: s.multishot, fireshot: s.fireshot, shield: s.shield, maxLives: s.maxLives, lives: s.lives, coins: s.coins },
      mobKills: { ...s.mobKills },
      enemiesPopupVisible: s.enemiesPopupVisible,
    });
  }

  public playSound(url: string, volume?: number) {
    if (!url) return;
    const vol = volume !== undefined ? volume : this.state.sfxVolume;
    const audio = new Audio(url);
    audio.volume = vol;
    audio.play().catch(() => { });
    this.playingSounds.push({ url, audio });
    audio.addEventListener('ended', () => {
      this.playingSounds = this.playingSounds.filter(item => item.audio !== audio);
    });
  }

  public stopSound(url: string) {
    this.playingSounds.forEach(item => {
      if (item.url === url) {
        item.audio.pause();
      }
    });
    this.playingSounds = this.playingSounds.filter(item => item.url !== url);
  }

  public playRandomMusic() {
    if (this.state.currentMusic) { this.state.currentMusic.pause(); this.state.currentMusic = null; }
    const track = MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)];
    const music = new Audio(track);
    music.volume = this.state.worldMusicVolume; music.loop = false;
    music.play().catch(() => { });
    music.addEventListener('ended', () => { if (!this.state.inShop && !this.state.isPaused) this.playRandomMusic(); });
    this.state.currentMusic = music;
  }

  public playShopMusic() {
    const s = this.state;
    if (!SHOP_SOUNDS.SHOP_MUSIC) return;
    if (s.currentMusic) s.currentMusic.pause();
    if (s.shopMusic) { s.shopMusic.pause(); s.shopMusic = null; }
    const music = new Audio(SHOP_SOUNDS.SHOP_MUSIC);
    music.volume = s.shopMusicVolume; music.loop = true;
    music.play().catch(() => { });
    s.shopMusic = music;
  }

  public resumeMusic() {
    const s = this.state;
    if (!s.gameStarted || s.isPaused || s.isDead) return;
    if (s.inShop) {
      if (s.shopMusic && s.shopMusic.paused) {
        s.shopMusic.play().catch(() => {});
      }
    } else {
      if (s.currentMusic && s.currentMusic.paused) {
        s.currentMusic.play().catch(() => {});
      }
    }
  }

  public setWorldMusicVolume(v: number) { this.state.worldMusicVolume = v / 100; if (this.state.currentMusic) this.state.currentMusic.volume = this.state.worldMusicVolume; this.resumeMusic(); this.emitState(); }
  public setShopMusicVolume(v: number) { this.state.shopMusicVolume = v / 100; if (this.state.shopMusic) this.state.shopMusic.volume = this.state.shopMusicVolume; this.resumeMusic(); this.emitState(); }
  public setMusicVolume(v: number) { this.setWorldMusicVolume(v); }
  public setSfxVolume(v: number) { this.state.sfxVolume = v / 100; this.emitState(); }
  public setWaterAnimOffset(v: number) {
    this.state.waterAnimOffset = v;
    localStorage.setItem('waterAnimOffset', v.toString());
    this.emitState();
  }
  public setMaxParticles(v: number) {
    this.state.maxParticles = v;
    if (v === 0) {
      this.state.particles.forEach(p => p.el.remove());
      this.state.particles = [];
    }
    this.emitState();
  }

  public updatePlayerSprite() {
    const s = this.state;
    if (s.multishot >= 1) {
      const level = Math.min(Math.floor(s.multishot), 3);
      if (s.fireshot > 0) {
        const frames = PLAYER_MULTISHOT_FIRE_ANIMS[level] || PLAYER_MULTISHOT_FIRE_ANIMS[2];
        this.playerEl.src = frames[s.playerAnimFrame % frames.length];
      } else {
        this.playerEl.src = PLAYER_SPRITES[level];
      }
      this.playerEl.style.width = '72px';
      this.playerEl.style.height = '72px';
      s.centerOffsetX = 36;
      s.centerOffsetY = 36;
    } else {
      if (s.fireshot > 0) {
        this.playerEl.src = PLAYER_ANIMS[s.playerAnimFrame % PLAYER_ANIMS.length];
        this.playerEl.style.width = '72px';
        this.playerEl.style.height = '42px';
        s.centerOffsetX = 36;
        s.centerOffsetY = 21;
      } else {
        this.playerEl.src = PLAYER_SPRITES[0];
        this.playerEl.style.width = '72px';
        this.playerEl.style.height = '42px';
        s.centerOffsetX = 36;
        s.centerOffsetY = 21;
      }
    }
  }

  public clearShieldElements() { this.state.shieldBullets.forEach(sb => sb.el.remove()); this.state.shieldBullets = []; }

  public rebuildShieldSystem() {
    const s = this.state; this.clearShieldElements(); if (s.shield <= 0) return;
    let count, hits; if (s.shield <= 5) { count = 3 + s.shield; hits = 2 + s.shield; } else { count = 4 + s.shield; hits = 4 + s.shield; }
    const baseSize = (s.fireshot > 0) ? Math.max(s.bulletSize * 1.5, 32) : s.bulletSize;
    for (let i = 0; i < count; i++) {
      const offsetAngle = (i * Math.PI * 2) / count;
      const el = document.createElement('img');
      el.src = (s.fireshot > 0) ? BULLET_ANIMS[0] : DEFAULT_BULLET_SPRITE;
      el.style.cssText = `width:${baseSize}px;position:absolute;transform-origin:center;opacity:1;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:9998;`;
      this.container.appendChild(el);
      s.shieldBullets.push({ el, ring: 'inner', offset: offsetAngle, maxPierce: hits, pierceLeft: hits, hitEnemies: [], animTimer: 0, animFrame: 0, spinDir: 1, size: baseSize });
    }
    if (s.shield >= 6) {
      const outerSize = baseSize * 1.5;
      for (let i = 0; i < count; i++) {
        const offsetAngle = (i * Math.PI * 2) / count;
        const el = document.createElement('img');
        el.src = (s.fireshot > 0) ? BULLET_ANIMS[0] : DEFAULT_BULLET_SPRITE;
        el.style.cssText = `width:${outerSize}px;position:absolute;transform-origin:center;opacity:1;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:9998;`;
        this.container.appendChild(el);
        s.shieldBullets.push({ el, ring: 'outer', offset: offsetAngle, maxPierce: hits, pierceLeft: hits, hitEnemies: [], animTimer: 0, animFrame: 0, spinDir: -1, size: outerSize });
      }
    }
  }

  public isCollision(ax: number, ay: number, aSize: number, bx: number, by: number, bSize: number) {
    const halfA = aSize / 2, halfB = bSize / 2;
    return ax + halfA > bx - halfB && ax - halfA < bx + halfB && ay + halfA > by - halfB && ay - halfA < by + halfB;
  }

  public getSpawnScreenWidth() { return window.innerWidth * this.state.screenScale; }
  public getSpawnScreenHeight() { return window.innerHeight * this.state.screenScale; }

  public applyScreenScale() {
    const scale = this.state.screenScale;
    this.container.style.width = (window.innerWidth * scale) + 'px';
    this.container.style.height = (window.innerHeight * scale) + 'px';
    this.container.style.left = (-(scale - 1) * window.innerWidth / 2) + 'px';
    this.container.style.top = (-(scale - 1) * window.innerHeight / 2) + 'px';
    this.container.style.right = 'auto';
    this.container.style.bottom = 'auto';
    this.container.style.transform = `scale(${1 / scale})`;
    this.container.style.transformOrigin = 'center center';
    if (this.bgCanvas) {
      this.bgCanvas.width = this.getSpawnScreenWidth();
      this.bgCanvas.height = this.getSpawnScreenHeight();
    }
  }

  public isOnScreen(x: number, y: number, padding = 80) {
    const s = this.state;
    return x >= s.cameraX - padding && x <= s.cameraX + this.getSpawnScreenWidth() + padding && y >= s.cameraY - padding && y <= s.cameraY + this.getSpawnScreenHeight() + padding;
  }

  public getCurrentShopMission() {
    const s = this.state;
    for (const sm of s.shopUnlockMissions) {
      if (s.completedMissions.includes(sm.id)) continue;
      const mission = s.activeMissions.find(m => m.id === sm.id);
      if (mission) return mission;
    }
    return null;
  }

  public getStatValues() {
    const s = this.state;
    return { acceleration: s.acceleration, bulletSpeed: s.bulletSpeed, bulletSize: s.bulletSize, fireRate: s.fireRate, bulletPierce: s.bulletPierce, multishot: s.multishot, fireshot: s.fireshot, shield: s.shield, maxLives: s.maxLives, lives: s.lives };
  }

  public isEnchantmentMaxed(id: string) { return isEnchantmentMaxedForValues(id, this.getStatValues(), this.state.enchantmentLevels); }

  public playMobSound(url: string, x: number, y: number, size?: number, volFactor?: number) {
    if (this.isOnScreen(x, y, Math.max(80, size || 0))) {
      const vol = (volFactor !== undefined) ? this.state.sfxVolume * volFactor : this.state.sfxVolume;
      this.playSound(url, vol);
    }
  }

  public shootBullet() {
    const s = this.state; const now = performance.now(); if (now - s.lastShot < s.fireDelay) return; s.lastShot = now; this.playSound(SOUNDS.SHOOT);
    const px = s.x + s.centerOffsetX, py = s.y + s.centerOffsetY;
    const worldMouseX = s.mouseX + s.cameraX, worldMouseY = s.mouseY + s.cameraY;
    const dx = worldMouseX - px, dy = worldMouseY - py; const baseAng = Math.atan2(dy, dx);
    const totalBullets = 1 + (s.multishot * 2); this.triggerMissionEvent('shoot', totalBullets);
    const angleStep = Math.PI / 12; // 15 degrees, completely equal angles apart for all levels of multishot
    const startAngle = baseAng - ((totalBullets - 1) * angleStep) / 2;
    const dynamicSpawnSize = (s.fireshot > 0) ? Math.max(s.bulletSize * 1.5, 32) : s.bulletSize;
    for (let i = 0; i < totalBullets; i++) {
      const currentAng = startAngle + (angleStep * i);
      const muzzleDistance = Math.max(8, PLAYER_MUZZLE_DISTANCE - (dynamicSpawnSize * 0.15));
      const sx = px + Math.cos(currentAng) * muzzleDistance, sy = py + Math.sin(currentAng) * muzzleDistance;
      const el = document.createElement('img'); el.src = (s.fireshot > 0) ? BULLET_ANIMS[0] : DEFAULT_BULLET_SPRITE;
      el.style.cssText = `width:${dynamicSpawnSize}px;height:${dynamicSpawnSize}px;object-fit:contain;position:absolute;transform-origin:center;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:9998;`;
      el.style.left = Math.round(sx - (dynamicSpawnSize / 2) - s.cameraX) + 'px'; el.style.top = Math.round(sy - (dynamicSpawnSize / 2) - s.cameraY) + 'px'; el.style.transform = `rotate(${currentAng}rad)`;
      this.container.appendChild(el);
      s.bullets.push({ id: Math.random().toString(36).substr(2, 9), x: sx, y: sy, vx: Math.cos(currentAng) * s.bulletSpeed, vy: Math.sin(currentAng) * s.bulletSpeed, el, angle: currentAng, pierceLeft: s.bulletPierce, hitEnemies: [], animTimer: 0, animFrame: 0, isFireSplit: false, sessionKills: 0 });
    }
  }

  public triggerFireshotSplit(enemyX: number, enemyY: number, enemySize: number) {
    const s = this.state; if (s.fireshot <= 0) return;
    if (s.bullets.length >= 60) return;
    this.triggerMissionEvent('fireshot_split', s.fireshot);
    const px = s.x + s.centerOffsetX, py = s.y + s.centerOffsetY;
    const baseAwayAngle = Math.atan2(enemyY - py, enemyX - px);
    const fireBulletSize = Math.max(s.bulletSize * 1.5, 32);
    const splitCount = Math.min(s.fireshot, 3);
    for (let i = 0; i < splitCount; i++) {
      const randomAngleOffset = (Math.random() * Math.PI) - (Math.PI / 2); const splitAngle = baseAwayAngle + randomAngleOffset;
      const spawnKickbackRadius = (enemySize / 2) + (fireBulletSize / 2) + 5;
      const spawnX = enemyX + Math.cos(splitAngle) * spawnKickbackRadius, spawnY = enemyY + Math.sin(splitAngle) * spawnKickbackRadius;
      const el = document.createElement('img'); el.src = BULLET_ANIMS[0];
      el.style.cssText = `width:${fireBulletSize}px;position:absolute;transform-origin:center;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:9998;`;
      el.style.left = Math.round(spawnX - (fireBulletSize / 2) - s.cameraX) + 'px'; el.style.top = Math.round(spawnY - (fireBulletSize / 2) - s.cameraY) + 'px'; el.style.transform = `rotate(${splitAngle}rad)`;
      this.container.appendChild(el);
      s.bullets.push({ id: Math.random().toString(36).substr(2, 9), x: spawnX, y: spawnY, vx: Math.cos(splitAngle) * s.bulletSpeed, vy: Math.sin(splitAngle) * s.bulletSpeed, el, angle: splitAngle, pierceLeft: Math.min(s.bulletPierce, 2), hitEnemies: [], animTimer: 0, animFrame: 0, isFireSplit: true, sessionKills: 0 });
    }
  }

  public getEnemyType(): EnemyType {
    const s = this.state; const elapsedMs = s.activePlaytime * 0.5 * 1.6; const elapsedSec = elapsedMs / 1000;
    const available = ENEMY_TYPES.filter(e => elapsedMs >= e.unlock); let totalWeight = 0;
    const weightedList = available.map(e => {
      let growthFactor = 1; if (elapsedMs > e.unlock) { const timeSinceUnlock = (elapsedMs - e.unlock) / 1000; growthFactor = 1 + (timeSinceUnlock * e.weightGrowth / 100); }
      if (e.name === 'Fast Mob' && elapsedSec > 40) growthFactor *= 2.5;
      if (e.name === 'Magic Mob' && elapsedSec > 40) growthFactor *= 3;
      if (e.name === 'Beefy Mob' && elapsedSec > 120) growthFactor *= 2;
      if (e.name === 'Shooter Mob' && elapsedSec > 95) growthFactor *= 1.4;
      if (e.name === 'Armored Mob') {
        const timeSinceUnlock = (elapsedMs - e.unlock) / 1000;
        const progress = Math.min(1, Math.max(0, timeSinceUnlock / 90)); // Ramps faster over 1.5 mins
        const rampScale = 0.3 + progress * 0.7; // Starts at 30%, ramps up to 100%
        growthFactor *= rampScale;
      }
      if (e.name === 'Mimic Mob' && elapsedSec > 130) growthFactor *= 1.25;
      const finalWeight = e.weight * growthFactor; totalWeight += finalWeight; return { ...e, finalWeight };
    });
    if (elapsedSec >= 20 && elapsedSec < 40) {
      const basic = weightedList.find(e => e.name === 'Basic Mob');
      const fast = weightedList.find(e => e.name === 'Fast Mob');
      const tank = weightedList.find(e => e.name === 'Big Mob');
      if (basic && fast && tank) { basic.finalWeight = 50; fast.finalWeight = 25; tank.finalWeight = 25; totalWeight = 100; }
    }
    if (s.shopVisits >= 4 && s.shopVisits <= 7) {
      const basic = weightedList.find(e => e.name === 'Basic Mob');
      const big = weightedList.find(e => e.name === 'Big Mob');
      if (basic) basic.finalWeight *= 2; if (big) big.finalWeight *= 2; totalWeight = weightedList.reduce((sum, e) => sum + e.finalWeight, 0);
    }
    let r = Math.random() * totalWeight; for (const e of weightedList) { r -= e.finalWeight; if (r <= 0) return e; } return weightedList[0];
  }

  public getSpawnInterval() {
    const elapsedSec = (this.state.activePlaytime * 0.5 * 1.6) / 1000; let baseRate;
    if (elapsedSec < 60) { baseRate = 2500 - (elapsedSec / 60) * 500; }
    else if (elapsedSec < 90) { const t = (elapsedSec - 60) / 30; baseRate = 2000 - t * 1200; }
    else if (elapsedSec < 120) { const t = (elapsedSec - 90) / 30; baseRate = 800 - t * 400; }
    else { baseRate = Math.max(150, 400 - (elapsedSec - 120) * 1.2); }
    const variance = baseRate * 0.2 * (Math.random() * 2 - 1);
    let interval = Math.max(150, (baseRate + variance) / Math.sqrt(this.state.screenScale));
    if (this.state.shopVisits >= 4) { interval = Math.max(75, interval / 2); }
    return interval;
  }

  public doSpawn() {
    const s = this.state;
    const totalEnemies = s.enemies.length;
    const onScreenEnemies = s.enemies.filter(e => !e.isUnloaded).length;
    if (totalEnemies >= 55 || onScreenEnemies >= 35) {
      return; // Skip spawning to limit loaded mobs and prevent lag
    }
    const side = Math.floor(Math.random() * 4); let ex = 0, ey = 0;
    const spawnWidth = this.getSpawnScreenWidth(), spawnHeight = this.getSpawnScreenHeight();
    const camLeft = s.x - spawnWidth / 2, camRight = s.x + spawnWidth / 2;
    const camTop = s.y - spawnHeight / 2, camBottom = s.y + spawnHeight / 2;
    if (side === 0) { ex = camLeft - 100; ey = camTop + Math.random() * spawnHeight; }
    if (side === 1) { ex = camRight+ 100; ey = camTop + Math.random() * spawnHeight; }
    if (side === 2) { ex = camLeft + Math.random() * spawnWidth; ey = camTop - 100; }
    if (side === 3) { ex = camLeft + Math.random() * spawnWidth; ey = camBottom + 100; }
    const type = this.getEnemyType();
    s.enemies.push(this.createEnemy(type, ex, ey));
  }

  public createEnemy(type: EnemyType, x: number, y: number): Enemy {
    const enemy: Enemy = {
      x, y, vx: 0, vy: 0, el: null, type,
      health: this.getEnemySpawnHealth(type),
      lastShot: 0,
      nextShotAt: Date.now() + this.getEnemyInitialShotDelay(type),
      hasSplit: false, isClone: false, originalId: null,
      id: Math.random().toString(36).substr(2, 9), isUnloaded: true,
      shieldBullets: [], activeShieldSignature: '', animTimer: 0, animFrame: 0
    };
    if (type.name === 'Magic Mob') {
      enemy.shootInterval = 1800 + Math.random() * 2200; // Slowed and matched with clones
    }
    if (type.canHaveShield) enemy.shieldLevel = Math.random() < 0.75 ? 1 + Math.floor(Math.random() * 4) : 0;
    if (type.canHaveMultishot) enemy.multishotLevel = Math.random() < 0.5 ? 1 : 0;
    
    // Only create DOM elements if spawned on screen
    if (this.isOnScreen(x, y, 200)) {
      enemy.isUnloaded = false;
      enemy.el = this.createEnemyElement(enemy);
      this.syncEnemyShieldSystem(enemy);
    }
    return enemy;
  }

  public createEnemyElement(enemy: Enemy) {
    const el = document.createElement('img'); el.src = this.getEnemySprite(enemy);
    const size = this.getEnemySize(enemy);
    el.style.cssText = `width:${size}px;position:absolute;transform-origin:center;visibility:visible;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:600;`;
    el.style.left = (enemy.x - this.state.cameraX) + 'px'; el.style.top = (enemy.y - this.state.cameraY) + 'px';
    this.container.appendChild(el);
    return el;
  }

  public getEnemySpawnHealth(type: EnemyType) { return type.health === 'player' ? Math.max(1, this.state.maxLives) : type.health; }
  public getEnemySize(enemy: Enemy) { return enemy.type.size === 'player' ? 72 : enemy.type.size; }
  public getMimicSprite() { const s = this.state; if (s.multishot > 0) return PLAYER_SPRITES[Math.min(Math.floor(s.multishot), 3)]; return s.fireshot > 0 ? PLAYER_ANIMS[s.playerAnimFrame] : PLAYER_SPRITES[0]; }
  public getEnemySprite(enemy: Enemy) { if (enemy.type.isBomber) return BOMBER_SPRITES[enemy.animFrame || 0]; if (enemy.type.isMimic) return this.getMimicSprite(); return enemy.type.sprite; }
  public getEnemySpeed(enemy: Enemy) { return enemy.type.speed === 'player' ? Math.max(2, this.state.acceleration * 5) : enemy.type.speed; }
  public getEnemyFireRate(enemy: Enemy) {
    if (enemy.type.isMimic) {
      const baseRate = enemy.type.fireRate === 'player' ? this.state.fireRate : enemy.type.fireRate;
      return baseRate * 0.45;
    }
    return enemy.type.fireRate === 'player' ? this.state.fireRate : enemy.type.fireRate;
  }
  public getEnemyBulletSpeed(enemy: Enemy) { if (enemy.type.isMimic) return this.state.bulletSpeed; if (enemy.type.shooterPattern === 'parallel') return 6; if (enemy.type.shooterPattern === 'spread') return 4.8; return 4; }
  public getEnemyBulletSize(enemy: Enemy) { if (enemy.type.isMimic) return this.state.fireshot > 0 ? Math.max(this.state.bulletSize * 1.5, 32) : this.state.bulletSize; if (enemy.type.shooterPattern === 'parallel') return 18; return 20; }
  public getEnemyBulletSprite(enemy: Enemy) { if (enemy.type.isMimic) return this.state.fireshot > 0 ? BULLET_ANIMS[0] : DEFAULT_BULLET_SPRITE; return enemy.type.bullet || MAGIC_BULLET_SPRITE; }
  public getEnemyFireshot(enemy: Enemy) { return enemy.type.isMimic ? Math.floor(this.state.fireshot) : 0; }
  public getEnemyMultishot(enemy: Enemy) { return enemy.type.isMimic ? Math.floor(this.state.multishot) : (enemy.multishotLevel || 0); }
  public getEnemyShieldLevel(enemy: Enemy) { return enemy.type.isMimic ? Math.floor(this.state.shield) : (enemy.shieldLevel || 0); }
  public getEnemyInitialShotDelay(type: EnemyType) { if (!type.isShooter) return 0; const rate = type.fireRate === 'player' ? this.state.fireRate : type.fireRate; return (1000 / Math.max(1, rate)) * (0.6 + Math.random() * 1.8); }

  public clearEnemyShieldElements(enemy: Enemy) { if (!enemy.shieldBullets) return; enemy.shieldBullets.forEach(sb => { if (sb.el) sb.el.remove(); }); enemy.shieldBullets = []; enemy.activeShieldSignature = ''; }

  public syncEnemyShieldSystem(enemy: Enemy) {
    const level = this.getEnemyShieldLevel(enemy);
    const fireshot = this.getEnemyFireshot(enemy);
    const baseSize = fireshot > 0 ? Math.max(this.state.bulletSize * 1.5, 32) : this.getEnemyBulletSize(enemy);
    const signature = `${level}:${fireshot}:${Math.round(baseSize)}`;
    if (level <= 0 || enemy.isUnloaded) { this.clearEnemyShieldElements(enemy); return; }
    if (enemy.activeShieldSignature === signature && enemy.shieldBullets && enemy.shieldBullets.length > 0) return;
    this.clearEnemyShieldElements(enemy);
    let count, hits; if (level <= 5) { count = 3 + level; hits = 2 + level; } else { count = 4 + level; hits = 4 + level; }
    const makeShield = (ring: "inner" | "outer", size: number, spinDir: number) => {
      for (let i = 0; i < count; i++) {
        const offsetAngle = (i * Math.PI * 2) / count;
        const el = document.createElement('img'); el.src = fireshot > 0 ? BULLET_ANIMS[0] : this.getEnemyBulletSprite(enemy);
        el.style.cssText = `width:${size}px;position:absolute;transform-origin:center;opacity:1;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:9997;`;
        this.container.appendChild(el);
        enemy.shieldBullets.push({ el, ring, offset: offsetAngle, maxPierce: hits, pierceLeft: hits, hitProjectiles: [], animTimer: 0, animFrame: 0, spinDir, size, worldX: enemy.x, worldY: enemy.y });
      }
    };
    makeShield('inner', baseSize, 1);
    if (level >= 6) makeShield('outer', baseSize * 1.5, -1);
    enemy.activeShieldSignature = signature;
  }

  public damageEnemyShield(enemy: Enemy, x: number, y: number, size: number, projectileId: string) {
    if (!enemy.shieldBullets || enemy.shieldBullets.length === 0) return false;
    for (let i = enemy.shieldBullets.length - 1; i >= 0; i--) {
      const sb = enemy.shieldBullets[i];
      if (projectileId && sb.hitProjectiles.includes(projectileId)) continue;
      if (this.isCollision(x, y, size, sb.worldX, sb.worldY, sb.size)) {
        if (projectileId) sb.hitProjectiles.push(projectileId);
        sb.pierceLeft--;
        if (sb.el) sb.el.style.opacity = Math.max(0, sb.pierceLeft / sb.maxPierce).toString();
        if (sb.pierceLeft <= 0) { if (sb.el) sb.el.remove(); enemy.shieldBullets.splice(i, 1); if (enemy.shieldBullets.length === 0) enemy.activeShieldSignature = ''; }
        return true;
      }
    }
    return false;
  }

  public updateEnemyShields(enemy: Enemy, dt: number, px: number, py: number) {
    if (enemy.isUnloaded) return;
    this.syncEnemyShieldSystem(enemy);
    if (!enemy.shieldBullets || enemy.shieldBullets.length === 0) return;
    const orbitSpeed = 0.03;
    const fireshot = this.getEnemyFireshot(enemy);
    // FIXED: Centre shields correctly using enemy's centre instead of top-left!
    const eSize = this.getEnemySize(enemy);
    const cx = enemy.x + eSize / 2;
    const cy = enemy.y + eSize / 2;

    for (let i = enemy.shieldBullets.length - 1; i >= 0; i--) {
      const sb = enemy.shieldBullets[i]; sb.offset += orbitSpeed * sb.spinDir;
      const orbitRadius = sb.ring === 'inner' ? 75 : 135;
      sb.worldX = cx + Math.cos(sb.offset) * orbitRadius;
      sb.worldY = cy + Math.sin(sb.offset) * orbitRadius;
      if (fireshot > 0) { sb.animTimer += dt; if (sb.animTimer >= 200) { sb.animTimer = 0; sb.animFrame = (sb.animFrame + 1) % BULLET_ANIMS.length; if (sb.el) sb.el.src = BULLET_ANIMS[sb.animFrame]; } }
      if (sb.el) { sb.el.style.left = Math.round(sb.worldX - (sb.size / 2) - this.state.cameraX) + 'px'; sb.el.style.top = Math.round(sb.worldY - (sb.size / 2) - this.state.cameraY) + 'px'; const bulletFacingAngle = sb.spinDir === 1 ? sb.offset + Math.PI / 2 : sb.offset - Math.PI / 2; sb.el.style.transform = `rotate(${bulletFacingAngle}rad)`; }
      if (this.isCollision(px, py, PLAYER_HITBOX_SIZE, sb.worldX, sb.worldY, sb.size)) { this.takeDamage(`${enemy.type.name} Shield`); sb.pierceLeft--; if (sb.el) sb.el.style.opacity = Math.max(0, sb.pierceLeft / sb.maxPierce).toString(); if (sb.pierceLeft <= 0) { if (sb.el) sb.el.remove(); enemy.shieldBullets.splice(i, 1); } }
    }
  }

  public createEnemyBullet(x: number, y: number, angle: number, enemy: Enemy, options: any = {}) {
    const size = options.size || this.getEnemyBulletSize(enemy);
    const speed = options.speed || this.getEnemyBulletSpeed(enemy);
    const sprite = options.sprite || this.getEnemyBulletSprite(enemy);
    const el = document.createElement('img'); el.src = sprite;
    // Lower z-layer: 400, which is below enemy elements (z-index: 600)
    el.style.cssText = `width:${size}px;position:absolute;transform-origin:center;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:400;`;
    el.style.left = (x - (size / 2) - this.state.cameraX) + 'px'; el.style.top = (y - (size / 2) - this.state.cameraY) + 'px'; el.style.transform = `rotate(${angle}rad)`;
    this.container.appendChild(el);
    
    const isShooterBullet = enemy.type.isShooter || enemy.type.name === 'Magic Mob';
    const isMimicFireshot = enemy.type.isMimic && this.getEnemyFireshot(enemy) > 0;
    const spinAngle = (isShooterBullet && !isMimicFireshot) ? Math.random() * Math.PI * 2 : undefined;
    const spinSpeed = (isShooterBullet && !isMimicFireshot) ? (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.004) : undefined;

    this.state.enemyBullets.push({ 
      x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, el, size, angle, 
      source: enemy.type.name, animTimer: 0, animFrame: 0, 
      animFrames: options.animFrames || null,
      spinAngle, spinSpeed
    });
  }

  public shootEnemySpread(enemy: Enemy, baseAng: number) {
    // Symmetrical spread bullet spawning from enemy's centre
    const eSize = this.getEnemySize(enemy);
    const cx = enemy.x + eSize / 2;
    const cy = enemy.y + eSize / 2;

    const multishot = this.getEnemyMultishot(enemy);
    const totalBullets = 1 + (multishot * 2);
    const angleStep = Math.PI / 12; // 15 degrees, completely equal angles apart for all levels of multishot
    const startAngle = baseAng - ((totalBullets - 1) * angleStep) / 2;
    const muzzleDistance = Math.max(10, eSize * 0.25);
    
    // Apply a single random offset to the whole spray so they stay symmetrical
    const spreadOffset = (Math.random() * 0.08 - 0.04);

    for (let i = 0; i < totalBullets; i++) {
      const ang = startAngle + (angleStep * i) + spreadOffset;
      const sx = cx + Math.cos(ang) * muzzleDistance;
      const sy = cy + Math.sin(ang) * muzzleDistance;
      this.createEnemyBullet(sx, sy, ang, enemy, { animFrames: this.getEnemyFireshot(enemy) > 0 ? BULLET_ANIMS : null });
    }
  }

  public shootEnemyParallel(enemy: Enemy, baseAng: number) {
    // Symmetrical parallel bullet spawning from enemy's centre
    const eSize = this.getEnemySize(enemy);
    const cx = enemy.x + eSize / 2;
    const cy = enemy.y + eSize / 2;

    const perp = baseAng + Math.PI / 2;
    const muzzleDistance = Math.max(12, eSize * 0.25);
    // Rows closer together (reduced offset from 13 to 10 for a tighter, cleaner symmetric alignment)
    const rowOffset = 10; 
    
    // Symmetrical shooting logic: Use the exact same base angle offset for both sides
    // Perfectly parallel: no random angle offset
    const finalAngle = baseAng;

    for (const side of [-1, 1]) {
      const sx = cx + Math.cos(finalAngle) * muzzleDistance + Math.cos(perp) * rowOffset * side;
      const sy = cy + Math.sin(finalAngle) * muzzleDistance + Math.sin(perp) * rowOffset * side;
      this.createEnemyBullet(sx, sy, finalAngle, enemy);
    }
  }

  public updateEnemyShooting(enemy: Enemy) {
    if (!enemy.type.isShooter || enemy.cloneAnimating) return;
    const now = Date.now(); if (now < enemy.nextShotAt) return;
    const rate = Math.max(0.1, this.getEnemyFireRate(enemy));
    const baseDelay = 1000 / rate;
    
    const eSize = this.getEnemySize(enemy);
    const ecx = enemy.x + eSize / 2;
    const ecy = enemy.y + eSize / 2;
    const pcx = this.state.x + this.state.centerOffsetX;
    const pcy = this.state.y + this.state.centerOffsetY;
    const baseAng = Math.atan2(pcy - ecy, pcx - ecx);
    
    let chance = 0.65, delayScale = 0.8 + Math.random() * 1.2;

    if (enemy.type.name === 'Armored Mob') {
      // FIXED: Increased armed mob's shot rate and accuracy significantly
      chance = 0.85;
      delayScale = 0.4 + Math.random() * 0.6;
    }
    if (enemy.type.name === 'Shooter Mob') { chance = 0.9; delayScale = 0.75 + Math.random() * 0.6; }
    if (enemy.type.isMimic) { chance = 0.72; delayScale = 0.85 + Math.random() * 1.1; }
    if (Math.random() < chance) {
      let soundUrl = SOUNDS.SHOOT_SHOOTER;
      if (enemy.type.name === 'Armored Mob') {
        soundUrl = SOUNDS.SHOOT_ARMORED;
      } else if (enemy.type.isMimic) {
        soundUrl = SOUNDS.SHOOT_MIMIC;
      } else if (enemy.type.name === 'Shooter Mob') {
        soundUrl = SOUNDS.SHOOT_SHOOTER;
      }
      this.playMobSound(soundUrl, enemy.x, enemy.y, this.getEnemySize(enemy));

      if (enemy.type.shooterPattern === 'parallel') this.shootEnemyParallel(enemy, baseAng);
      else this.shootEnemySpread(enemy, baseAng);
    }
    enemy.nextShotAt = now + baseDelay * delayScale;
  }

  public startExplosion(x: number, y: number) {
    const size = BOMBER_EXPLOSION_RADIUS * 2;
    const el = document.createElement('img');
    el.referrerPolicy = "no-referrer";
    if (this._explosionFrameCache && this._explosionFrameCache[0]) {
      el.src = this._explosionFrameCache[0].src;
    } else {
      el.src = BOMBER_EXPLOSION_FRAMES[0];
    }
    el.style.cssText = `width:${size}px;height:${size}px;position:absolute;transform-origin:center;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:10002;`;
    el.style.left = (x - size / 2 - this.state.cameraX) + 'px'; el.style.top = (y - size / 2 - this.state.cameraY) + 'px';
    this.container.appendChild(el);
    this.state.explosions.push({ x, y, size, el, frame: 0, startTime: Date.now() });
  }

  public updateExplosions() {
    const s = this.state;
    const now = Date.now();
    for (let i = s.explosions.length - 1; i >= 0; i--) {
      const ex = s.explosions[i];
      const elapsed = now - ex.startTime;
      const frame = Math.floor(elapsed / BOMBER_EXPLOSION_FRAME_TIME);
      if (frame >= BOMBER_EXPLOSION_FRAMES.length) {
        ex.el.remove();
        s.explosions.splice(i, 1);
        continue;
      }
      if (ex.frame !== frame) {
        ex.frame = frame;
        if (this._explosionFrameCache && this._explosionFrameCache[frame]) {
          ex.el.src = this._explosionFrameCache[frame].src;
        } else {
          ex.el.src = BOMBER_EXPLOSION_FRAMES[frame];
        }
      }
      ex.el.style.left = Math.round(ex.x - ex.size / 2 - s.cameraX) + 'px';
      ex.el.style.top = Math.round(ex.y - ex.size / 2 - s.cameraY) + 'px';
    }
  }

  public spawnPlayerParticle() {
    const s = this.state;
    if (s.particles.length >= s.maxParticles) return;
    const size = 5 + Math.random() * 8;
    const el = document.createElement('img');
    el.src = "https://codehs.com/uploads/28fa6fa755aabb395f685d97bd917e86";
    const px = s.x + s.centerOffsetX;
    const py = s.y + s.centerOffsetY;
    const x = px + (Math.random() - 0.5) * 16 - (s.vx * 1.5);
    const y = py + (Math.random() - 0.5) * 16 - (s.vy * 1.5);
    el.style.cssText = `width:${size}px;height:${size}px;position:absolute;left:0;top:0;transform-origin:center;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:300;opacity:0.95;`;
    const tx = Math.round(x - size / 2 - s.cameraX);
    const ty = Math.round(y - size / 2 - s.cameraY);
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    this.container.appendChild(el);
    s.particles.push({ x, y, size, el, startTime: Date.now(), duration: 500, isFireshot: false });
  }

  public spawnBulletParticle(bx: number, by: number) {
    const s = this.state;
    if (s.particles.length >= s.maxParticles) return;
    const size = 12 + Math.random() * 12;
    const el = document.createElement('img');
    el.src = "https://codehs.com/uploads/28fa6fa755aabb395f685d97bd917e86";
    el.style.cssText = `width:${size}px;height:${size}px;position:absolute;left:0;top:0;transform-origin:center;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:300;opacity:0.9;filter:brightness(0.35) saturate(1.8);`;
    const tx = Math.round(bx - size / 2 - s.cameraX);
    const ty = Math.round(by - size / 2 - s.cameraY);
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    this.container.appendChild(el);
    s.particles.push({ x: bx, y: by, size, el, startTime: Date.now(), duration: 250, isFireshot: true });
  }

  public updateParticles() {
    const s = this.state;
    const now = Date.now();
    for (let i = s.particles.length - 1; i >= 0; i--) {
      const p = s.particles[i];
      const elapsed = now - p.startTime;
      if (elapsed >= p.duration) {
        p.el.remove();
        s.particles.splice(i, 1);
        continue;
      }
      const ratio = elapsed / p.duration;
      const opacity = Math.max(0, 0.95 * (1 - ratio));
      p.el.style.opacity = opacity.toString();
      const scale = 1 - ratio * 0.3;
      const tx = Math.round(p.x - p.size / 2 - s.cameraX);
      const ty = Math.round(p.y - p.size / 2 - s.cameraY);
      p.el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    }
  }

  public explodeBomber(enemy: Enemy) {
    const s = this.state;
    this.stopSound(SOUNDS.BOMBER_FUSE);
    this.playSound(SOUNDS.BOMBER_EXPLODE, s.sfxVolume * 1.4);

    // FIXED: Find index and completely remove from active simulation array FIRST
    const idx = s.enemies.indexOf(enemy);
    if (idx !== -1) {
      s.enemies.splice(idx, 1);
    }
    if (enemy.el) {
      enemy.el.remove();
    }
    this.clearEnemyShieldElements(enemy);

    // Trigger visual explosion at central position
    const eSize = this.getEnemySize(enemy);
    const ex = enemy.x + eSize / 2;
    const ey = enemy.y + eSize / 2;
    this.startExplosion(ex, ey);

    const px = s.x + s.centerOffsetX;
    const py = s.y + s.centerOffsetY;
    const playerDist = Math.hypot(px - ex, py - ey);
    if (playerDist <= BOMBER_EXPLOSION_RADIUS * 0.85) {
      this.takeDamage('Bomber Explosion');
    }

    // Damage all other enemies within explosion radius
    const victims = s.enemies.filter(e => {
      const size = this.getEnemySize(e);
      const cx = e.x + size / 2;
      const cy = e.y + size / 2;
      return Math.hypot(cx - ex, cy - ey) <= BOMBER_EXPLOSION_RADIUS * 0.85;
    });

    victims.forEach(victim => {
      const vIdx = s.enemies.indexOf(victim);
      if (vIdx !== -1) {
        this._killEnemy(victim, vIdx, 'explosion');
      }
    });

    // Destroy all player bullets in blast radius
    for (let i = s.bullets.length - 1; i >= 0; i--) {
      const b = s.bullets[i];
      const dist = Math.hypot(b.x - ex, b.y - ey);
      if (dist <= BOMBER_EXPLOSION_RADIUS * 0.85) {
        if (b.el) b.el.remove();
        s.bullets.splice(i, 1);
      }
    }

    // Destroy all enemy bullets in blast radius
    for (let i = s.enemyBullets.length - 1; i >= 0; i--) {
      const eb = s.enemyBullets[i];
      const dist = Math.hypot(eb.x - ex, eb.y - ey);
      if (dist <= BOMBER_EXPLOSION_RADIUS * 0.85) {
        if (eb.el) eb.el.remove();
        s.enemyBullets.splice(i, 1);
      }
    }
  }

  public spawnMagicClones(originalEnemy: Enemy) {
    const s = this.state; const eSize = this.getEnemySize(originalEnemy); this.playMobSound(SOUNDS.MAGIC_CLONE, originalEnemy.x, originalEnemy.y, eSize);
    const cloneAngles = [0, Math.PI / 3, 2 * Math.PI / 3, Math.PI, 4 * Math.PI / 3, 5 * Math.PI / 3]; const spawnTime = Date.now();
    cloneAngles.forEach(angle => {
      const cloneEl = document.createElement('img'); cloneEl.src = originalEnemy.type.sprite;
      cloneEl.style.cssText = `width:${eSize}px;position:absolute;transform-origin:center;visibility:visible;pointer-events:none;user-select:none;-webkit-user-drag:none;z-index:600;`;
      this.container.appendChild(cloneEl);
      s.enemies.push({
        x: originalEnemy.x, y: originalEnemy.y, vx: 0, vy: 0, el: cloneEl, type: originalEnemy.type,
        health: 7, // FIXED: Clones also get 7 health!
        lastShot: Date.now() + Math.random() * 2000,
        nextShotAt: Date.now() + 1000,
        shootInterval: 1800 + Math.random() * 2200, // FIXED: Deceased shoot rate and matched with original
        hasSplit: false,
        isClone: true, originalId: originalEnemy.id, cloneAngle: angle, cloneStartX: originalEnemy.x, cloneStartY: originalEnemy.y, cloneSpawnTime: spawnTime, cloneAnimating: true, id: Math.random().toString(36).substr(2, 9), isUnloaded: false, shieldBullets: [], activeShieldSignature: '', animTimer: 0, animFrame: 0
      });
    });
  }

  public damageMagicClones(originalEnemy: Enemy) {
    const s = this.state;
    s.enemies.forEach(clone => {
      if (clone.isClone && clone.originalId === originalEnemy.id) {
        clone.health -= 1;
        clone.lastDamageTime = Date.now();
      }
    });
  }

  public shootMagicBullet(enemy: Enemy) {
    const s = this.state; this.playMobSound(SOUNDS.MAGIC_SHOOT, enemy.x, enemy.y, this.getEnemySize(enemy));
    const ang = Math.atan2(s.y - enemy.y, s.x - enemy.x); const bSize = 20, bSpeed = 4;
    // FIXED: Spawns from center instead of top-left!
    const eSize = this.getEnemySize(enemy);
    const bx = enemy.x + eSize / 2;
    const by = enemy.y + eSize / 2;
    this.createEnemyBullet(bx, by, ang, enemy, { size: bSize, speed: bSpeed, sprite: MAGIC_BULLET_SPRITE });
  }

  public triggerHitFlash() { this.state.hitFlash = true; this.emitState(); clearTimeout(this.hitFlashTimeout); this.hitFlashTimeout = setTimeout(() => { this.state.hitFlash = false; this.emitState(); }, 200); }

  public takeDamage(cause: string) {
    const s = this.state; const now = Date.now();
    if (now - s.lastHitTime < HIT_COOLDOWN || s.isDead) return;
    if (s.shopEntranceActive && s.shopEntranceEl) { const px = s.x + s.centerOffsetX, py = s.y + s.centerOffsetY; if (this.isCollision(px, py, PLAYER_HITBOX_SIZE, s.shopEntranceX, s.shopEntranceY, SHOP_SPRITE_SIZE)) return; }
    s.lastHitTime = now; s.lives--; this.playSound(SOUNDS.DAMAGE); this.triggerHitFlash(); this.emitState();
    if (s.lives <= 0) this.playerDied(cause);
  }

  public playerDied(cause: string) {
    const s = this.state; s.isDead = true; this.playSound(SOUNDS.DEATH, 0.7); if (s.currentMusic) s.currentMusic.pause();
    if (s.shopMusic) s.shopMusic.pause();
    const secondsSurvived = Math.floor(s.activePlaytime / 1000); const finalScore = secondsSurvived * s.coins;
    s.deathMessage = `Died by: ${cause || 'Unknown'}`; s.scoreMessage = `SCORE: ${finalScore}`; this.emitState();
    clearTimeout(this.deathTimeout); this.deathTimeout = setTimeout(() => { if (this.state.isDead) { this.state.showDeathScreen = true; this.emitState(); } }, 2000);
  }

  public updateActiveMissions() {
    const s = this.state;
    MISSION_DATABASE.forEach(mission => {
      if (s.activeMissions.find(m => m.id === mission.id) || s.completedMissions.includes(mission.id)) return;
      let meetsReqs = true;
      if (mission.req) { if (mission.req.bulletPierce && s.bulletPierce < mission.req.bulletPierce) meetsReqs = false; if (mission.req.fireshot && s.fireshot < mission.req.fireshot) meetsReqs = false; if (mission.req.shield && s.shield < mission.req.shield) meetsReqs = false; if (mission.req.multishot && s.multishot < mission.req.multishot) meetsReqs = false; }
      if (meetsReqs) s.activeMissions.push({ ...mission, progress: 0 });
    });
  }

  public triggerMissionEvent(eventType: string, amount?: number, eventData?: any) {
    const s = this.state;
    if (s.shopEntranceActive || s.inShop || s.enteringShop) return;
    const amt = amount || 1; const data = eventData || {};
    const currentShopMission = this.getCurrentShopMission();
    const missionsToUpdate = currentShopMission ? [currentShopMission] : s.activeMissions;
    missionsToUpdate.forEach(mission => {
      if (mission.type !== eventType) return; let match = true;
      if (mission.type === 'kill_mob' && mission.targetId !== data.mobType) match = false;
      if (mission.type === 'bullet_multikill') { if (data.killCount >= mission.target) { mission.progress = mission.target; } else { match = false; } }
      if (match && mission.type !== 'bullet_multikill') { mission.progress += amt; }
      if (mission.progress >= mission.target && !s.completedMissions.includes(mission.id)) { s.completedMissions.push(mission.id); if (SHOP_SOUNDS.TASK_COMPLETE) this.playSound(SHOP_SOUNDS.TASK_COMPLETE); }
    });
    s.activeMissions = s.activeMissions.filter(m => m.progress < m.target);
    this.updateMissionProgressPopup(); this.checkShopUnlockComplete();
  }

  public updateMissionProgressPopup() {
    const s = this.state; const mission = this.getCurrentShopMission();
    const ratio = mission ? mission.progress / mission.target : 0;
    const newState = mission && ratio >= 0.8 && ratio < 1 ? { visible: true, text: mission.desc, progress: mission.progress, target: mission.target } : { visible: false, text: '', progress: 0, target: 0 };
    const changed = s.missionProgress.visible !== newState.visible || Math.floor(s.missionProgress.progress) !== Math.floor(newState.progress) || s.missionProgress.target !== newState.target;
    s.missionProgress = newState; if (changed) this.emitState();
  }

  public getGenericPoolByDifficulty(diff: number) { return MISSION_DATABASE.filter(m => m.difficulty === diff && !m.statCategory); }
  public getAvailableStatMissions() {
    const s = this.state; return MISSION_DATABASE.filter(m => {
      if (!m.statCategory) return false;
      if (m.statCategory === 'pierce') return s.bulletPierce >= (m.req?.bulletPierce || 1);
      if (m.statCategory === 'fireshot') return s.fireshot >= (m.req?.fireshot || 1);
      if (m.statCategory === 'shield') return s.shield >= (m.req?.shield || 1);
      if (m.statCategory === 'multishot') return s.multishot >= (m.req?.multishot || 1);
      return false;
    });
  }
  public pickRandomMissionDef(pool: any[], excludeIds: string[]) { const filtered = pool.filter(m => !excludeIds.includes(m.id)); if (filtered.length === 0) return null; return filtered[Math.floor(Math.random() * filtered.length)]; }

  public pickNextMissionFromTier(excludeIds: string[]) {
    const s = this.state; const minTier = Math.min(4, Math.max(1, s.shopVisits)); let tier = Math.max(minTier, s.shopMissionTier);
    while (tier <= 4) {
      const pool = this.getGenericPoolByDifficulty(tier);
      const available = pool.filter(m => !s.usedMissionIds[tier].includes(m.id) && !excludeIds.includes(m.id));
      if (available.length > 0) { const picked = available[Math.floor(Math.random() * available.length)]; s.usedMissionIds[tier].push(picked.id); s.shopMissionTier = tier; return picked; }
      tier++;
    }
    s.usedMissionIds = { 1: [], 2: [], 3: [], 4: [] };
    const allGeneric = MISSION_DATABASE.filter(m => !m.statCategory && !excludeIds.includes(m.id));
    if (allGeneric.length === 0) return null;
    const picked = allGeneric[Math.floor(Math.random() * allGeneric.length)];
    s.usedMissionIds[picked.difficulty] = s.usedMissionIds[picked.difficulty] || [];
    s.usedMissionIds[picked.difficulty].push(picked.id);
    return picked;
  }

  public getShopMissionPackage(visitNumber: number) {
    let comboChance = 0, statChance = 0;
    if (visitNumber <= 3) { statChance = 0; } else if (visitNumber <= 6) { statChance = 0.15; } else if (visitNumber <= 12) { statChance = 0.3; comboChance = 0.4; } else { statChance = 0.5; comboChance = 0.7; }
    const chosen = []; const first = this.pickNextMissionFromTier([]); if (first) chosen.push(first);
    if (Math.random() < comboChance) { const extra = this.pickNextMissionFromTier(chosen.map(m => m.id)); if (extra) chosen.push(extra); }
    if (Math.random() < statChance) { const statPool = this.getAvailableStatMissions(); const extra = this.pickRandomMissionDef(statPool, chosen.map(m => m.id)); if (extra) chosen.push(extra); }
    return chosen;
  }

  public assignShopUnlockMissions() {
    const s = this.state; const visitNumber = s.shopVisits + 1;
    let chosenDefs = this.getShopMissionPackage(visitNumber);
    if (chosenDefs.length === 0) { const fallback = MISSION_DATABASE.filter(m => !m.statCategory); if (fallback.length > 0) { chosenDefs = [fallback[Math.floor(Math.random() * fallback.length)]]; } }
    s.shopUnlockMissions = [];
    chosenDefs.forEach(def => { s.shopMissionCounter++; const instanceId = def.id + '_shopinst' + s.shopMissionCounter; s.activeMissions.push({ ...def, id: instanceId, progress: 0, isShopUnlock: true }); s.shopUnlockMissions.push({ id: instanceId, desc: def.desc, target: def.target }); });
    if (chosenDefs.length > 0) { this.showPopupMessage(chosenDefs.length > 1 ? 'NEW MISSIONS' : 'NEW MISSION', chosenDefs.map(d => d.desc).join('   +   ')); }
    this.emitState();
  }

  public showPopupMessage(title: string, desc: string) { const s = this.state; s.missionPopup = { title, desc, visible: true }; this.emitState(); clearTimeout(this.missionPopupTimer); this.missionPopupTimer = setTimeout(() => { s.missionPopup = { ...s.missionPopup, visible: false }; this.emitState(); }, 10000); }

  public checkShopUnlockComplete() { const s = this.state; if (s.inShop || s.shopEntranceActive || s.shopUnlockMissions.length === 0) return; const allDone = s.shopUnlockMissions.every(sm => s.completedMissions.includes(sm.id)); if (allDone) this.spawnShopEntrance(); }

  public spawnShopEntrance() {
    const s = this.state; s.shopEntranceActive = true;
    const angle = Math.random() * Math.PI * 2; const distance = 2500;
    s.shopEntranceX = s.x + Math.cos(angle) * distance; s.shopEntranceY = s.y + Math.sin(angle) * distance;
    const el = document.createElement('img'); el.src = DOOR_ANIM_FRAMES[0];
    el.style.cssText = `width:${SHOP_SPRITE_SIZE}px;position:absolute;z-index:500;pointer-events:none;user-select:none;-webkit-user-drag:none;`;
    el.style.left = Math.round(s.shopEntranceX - s.cameraX) + 'px'; el.style.top = Math.round(s.shopEntranceY - s.cameraY) + 'px'; this.container.appendChild(el);
    s.shopEntranceEl = el; s.entranceDoorAnimFrame = 0; s.entranceDoorAnimPlayed = false; s.entranceDoorAnimTimer = 0;
    const arrowEl = document.createElement('img'); arrowEl.src = "https://codehs.com/uploads/47d2aecdb1c143d3e23af2901a76dd7f";
    arrowEl.style.cssText = `width:40px;position:fixed;z-index:100004;pointer-events:none;user-select:none;-webkit-user-drag:none;transform-origin:center;opacity:0;`; this.container.appendChild(arrowEl); s.shopArrowEl = arrowEl;
    const textEl = document.createElement('div'); textEl.textContent = 'SHOP HAS OPENED';
    textEl.style.cssText = `position:fixed;z-index:100004;pointer-events:none;font-family:'Press Start 2P',monospace;font-size:14px;color:#ffcc00;text-shadow:2px 2px 0 #000;white-space:nowrap;opacity:0;`; this.container.appendChild(textEl); s.shopArrowTextEl = textEl;
    s.shopArrowAnimFrame = 0; s.shopArrowAnimTimer = 0; s.lastShopArrowBeepTime = 0; this.emitState();
  }

  public clearPhysicalShopItems() {
    const s = this.state;
    s.shopItemEls.forEach(item => { if (item.el) item.el.remove(); });
    s.shopItemEls = [];
    if (s.shopTitleEl) { s.shopTitleEl.remove(); s.shopTitleEl = null; }
  }

  public createPhysicalShopItems() {
    const s = this.state; this.clearPhysicalShopItems();
    const rows = Math.ceil(ENCHANTMENTS.length / SHOP_ITEM_COLUMNS);

    const scaledWidth = SHOP_ITEM_WIDTH * s.screenScale;
    const scaledHeight = SHOP_ITEM_HEIGHT * s.screenScale;
    const scaledGap = SHOP_ITEM_GAP * s.screenScale;
    const scaledRowGap = SHOP_ITEM_ROW_GAP * s.screenScale;

    const totalWidth = (SHOP_ITEM_COLUMNS * scaledWidth) + ((SHOP_ITEM_COLUMNS - 1) * scaledGap);
    const totalHeight = (rows * scaledHeight) + ((rows - 1) * scaledRowGap);
    const startX = SHOP_AREA_X - (totalWidth / 2);
    const startY = SHOP_AREA_Y - (totalHeight / 2) - (35 * s.screenScale);

    // Create yellow 'THE SHOP' big text
    const titleEl = document.createElement('div');
    titleEl.textContent = 'THE SHOP';
    const titleFontSize = 40 * s.screenScale;
    titleEl.style.cssText = `position:absolute;font-family:'Press Start 2P',monospace;font-size:${titleFontSize}px;color:#ffcc00;text-shadow:${4 * s.screenScale}px ${4 * s.screenScale}px 0 #000;white-space:nowrap;z-index:10000;pointer-events:none;transform:translate(-50%, -50%);`;
    const titleX = SHOP_AREA_X;
    const titleY = startY - 80 * s.screenScale;
    titleEl.style.left = Math.round(titleX - s.cameraX) + 'px';
    titleEl.style.top = Math.round(titleY - s.cameraY) + 'px';
    this.container.appendChild(titleEl);
    s.shopTitleEl = titleEl;

    ENCHANTMENTS.forEach((enchant, index) => {
      const col = index % SHOP_ITEM_COLUMNS, row = Math.floor(index / SHOP_ITEM_COLUMNS);
      const x = startX + col * (scaledWidth + scaledGap), y = startY + row * (scaledHeight + scaledRowGap);
      const box = document.createElement('div'); box.setAttribute('data-ui', ''); box.dataset.enchantId = enchant.id;

      box.style.cssText = `position:absolute;width:${scaledWidth}px;height:${scaledHeight}px;background:rgba(45,45,45,0.95);border:${3 * s.screenScale}px solid #ffcc00;box-shadow:${4 * s.screenScale}px ${4 * s.screenScale}px 0 #000;padding:${8 * s.screenScale}px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${5 * s.screenScale}px;z-index:10000;pointer-events:auto;transition:transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;`;

      const scaledIconSize = 110 * s.screenScale;
      const nameFontSize = 8 * s.screenScale;
      const priceFontSize = 10 * s.screenScale;
      const levelFontSize = 8 * s.screenScale;

      box.innerHTML = `<img src="${enchant.icon}" draggable="false" style="width:${scaledIconSize}px;height:${scaledIconSize}px;object-fit:contain;image-rendering:pixelated;pointer-events:none;-webkit-user-drag:none;" /><p style="color:#fff;font-family:'Press Start 2P',monospace;font-size:${nameFontSize}px;text-align:center;margin:0;line-height:1.35;">${enchant.name}</p><p class="price" style="color:#ffcc00;font-family:'Press Start 2P',monospace;font-size:${priceFontSize}px;margin:0;">0</p><p class="level" style="color:#aaa;font-family:'Press Start 2P',monospace;font-size:${levelFontSize}px;margin:0;">LV 0</p>`;

      // Hover Tooltip Box
      const tooltip = document.createElement('div');
      tooltip.style.cssText = `position:absolute;bottom:104%;left:-${3 * s.screenScale}px;width:${scaledWidth}px;background:rgba(15,15,15,0.98);border:${2 * s.screenScale}px solid #ffcc00;box-shadow:${3 * s.screenScale}px ${3 * s.screenScale}px 0 #000;padding:${6 * s.screenScale}px;font-family:'Press Start 2P',monospace;font-size:${6 * s.screenScale}px;color:#fff;line-height:1.4;pointer-events:none;z-index:10001;opacity:0;transform:scale(0.85);transform-origin:bottom center;transition:opacity 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);text-align:center;word-break:break-word;`;
      tooltip.textContent = enchant.description;
      box.appendChild(tooltip);

      box.addEventListener('mouseenter', () => {
        const level = s.enchantmentLevels[enchant.id] || 0;
        const price = getEnchantmentPrice(enchant, level);
        const isMaxed = this.isEnchantmentMaxed(enchant.id);
        const canAfford = !isMaxed && s.coins >= price;

        if (canAfford) {
          box.style.transform = 'scale(1.06)';
          box.style.borderColor = '#ffffff';
          box.style.boxShadow = `${6 * s.screenScale}px ${6 * s.screenScale}px 0 #000`;
        } else {
          box.style.borderColor = '#555';
        }
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'scale(1)';
      });
      box.addEventListener('mouseleave', () => {
        const level = s.enchantmentLevels[enchant.id] || 0;
        const price = getEnchantmentPrice(enchant, level);
        const isMaxed = this.isEnchantmentMaxed(enchant.id);
        const canAfford = !isMaxed && s.coins >= price;

        box.style.transform = 'scale(1)';
        box.style.borderColor = canAfford ? '#ffcc00' : '#555';
        box.style.boxShadow = `${4 * s.screenScale}px ${4 * s.screenScale}px 0 #000`;
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'scale(0.85)';
      });
      box.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); this.buyEnchantment(enchant.id); });
      this.container.appendChild(box);
      s.shopItemEls.push({ el: box, enchantId: enchant.id, x, y });
    });

    // Render the Enemies Button (Pretty big, located to the left of the upgrades)
    const enemiesButtonX = startX - scaledWidth - (70 * s.screenScale);
    const enemiesButtonY = startY + (totalHeight - scaledHeight) / 2;

    const enemiesBtn = document.createElement('div');
    enemiesBtn.setAttribute('data-ui', '');
    enemiesBtn.style.cssText = `position:absolute;width:${scaledWidth}px;height:${scaledHeight}px;background:rgba(20,20,20,0.95);border:${3 * s.screenScale}px solid #ff4444;box-shadow:${4 * s.screenScale}px ${4 * s.screenScale}px 0 #000;padding:${8 * s.screenScale}px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${10 * s.screenScale}px;z-index:10000;pointer-events:auto;transition:transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.25s ease, box-shadow 0.25s ease;`;

    const iconSize = 95 * s.screenScale;
    const labelFontSize = 10 * s.screenScale;

    enemiesBtn.innerHTML = `
      <img src="https://codehs.com/uploads/c1f80496c09b22885b7c5363c5a39f61" draggable="false" style="width:${iconSize}px;height:${iconSize}px;object-fit:contain;image-rendering:pixelated;pointer-events:none;" />
      <p style="color:#ff4444;font-family:'Press Start 2P',monospace;font-size:${labelFontSize}px;text-align:center;margin:0;line-height:1.4;font-weight:bold;">ENEMIES</p>
    `;

    enemiesBtn.addEventListener('mouseenter', () => {
      enemiesBtn.style.transform = 'scale(1.06)';
      enemiesBtn.style.borderColor = '#ff6666';
      enemiesBtn.style.boxShadow = `${6 * s.screenScale}px ${6 * s.screenScale}px 0 #000`;
    });
    enemiesBtn.addEventListener('mouseleave', () => {
      enemiesBtn.style.transform = 'scale(1)';
      enemiesBtn.style.borderColor = '#ff4444';
      enemiesBtn.style.boxShadow = `${4 * s.screenScale}px ${4 * s.screenScale}px 0 #000`;
    });
    enemiesBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      this.playSound(SOUNDS.BUTTON_CLICK);
      s.enemiesPopupVisible = true;
      this.emitState();
    });

    this.container.appendChild(enemiesBtn);
    s.shopItemEls.push({ el: enemiesBtn, enchantId: 'enemies', x: enemiesButtonX, y: enemiesButtonY });

    s.shopExitX = startX + totalWidth + (130 * s.screenScale); s.shopExitY = startY + (totalHeight - SHOP_SPRITE_SIZE * s.screenScale) / 2;
    this.refreshPhysicalShopItems();
    this.positionPhysicalShopItems();
  }

  public refreshPhysicalShopItems() {
    const s = this.state;
    s.shopItemEls.forEach(item => {
      const enchant = ENCHANTMENTS.find(e => e.id === item.enchantId); if (!enchant) return;
      const level = s.enchantmentLevels[enchant.id] || 0; const price = getEnchantmentPrice(enchant, level); const isMaxed = this.isEnchantmentMaxed(enchant.id); const canAfford = !isMaxed && s.coins >= price;
      const priceEl = item.el.querySelector('.price');
      const levelEl = item.el.querySelector('.level');
      if (priceEl) priceEl.textContent = isMaxed ? 'MAX' : price.toString();
      if (levelEl) levelEl.textContent = `LV ${level}`;
      item.el.style.borderColor = canAfford ? '#ffcc00' : '#555'; item.el.style.background = canAfford ? 'rgba(45,45,45,0.95)' : 'rgba(28,28,28,0.85)';
      item.el.style.borderWidth = `${3 * s.screenScale}px`;
      if (priceEl) {
        (priceEl as HTMLElement).style.color = isMaxed ? '#66ff99' : (canAfford ? '#ffcc00' : '#ff6666');
      }
      item.el.style.cursor = canAfford ? 'pointer' : 'not-allowed';
    });
  }

  public positionPhysicalShopItems() {
    const s = this.state;
    s.shopItemEls.forEach(item => { item.el.style.left = Math.round(item.x - s.cameraX) + 'px'; item.el.style.top = Math.round(item.y - s.cameraY) + 'px'; });
    if (s.shopTitleEl) {
      const rows = Math.ceil(ENCHANTMENTS.length / SHOP_ITEM_COLUMNS);
      const scaledHeight = SHOP_ITEM_HEIGHT * s.screenScale;
      const scaledRowGap = SHOP_ITEM_ROW_GAP * s.screenScale;
      const totalHeight = (rows * scaledHeight) + ((rows - 1) * scaledRowGap);
      const startY = SHOP_AREA_Y - (totalHeight / 2) - (35 * s.screenScale);
      const titleY = startY - 80 * s.screenScale;
      s.shopTitleEl.style.left = Math.round(SHOP_AREA_X - s.cameraX) + 'px';
      s.shopTitleEl.style.top = Math.round(titleY - s.cameraY) + 'px';
    }
  }

  public enterShop() {
    const s = this.state; if (s.inShop || s.enteringShop) return; s.enteringShop = true; s.shopEntranceActive = false;
    s.shopUnlockMissions = [];
    s.activeMissions = s.activeMissions.filter(m => !m.isShopUnlock);
    this.stopSound(SHOP_SOUNDS.SHOP_ARROW_BEEP);
    this.stopSound(SHOP_SOUNDS.TASK_COMPLETE);
    this.stopSound(SHOP_SOUNDS.SHOP_ENTER);
    if (SHOP_SOUNDS.SHOP_ENTER) this.playSound(SHOP_SOUNDS.SHOP_ENTER);

    if (s.shopEntranceEl) { s.shopEntranceEl.remove(); s.shopEntranceEl = null; }
    if (s.shopArrowEl) { s.shopArrowEl.remove(); s.shopArrowEl = null; }
    if (s.shopArrowTextEl) { s.shopArrowTextEl.remove(); s.shopArrowTextEl = null; }
    s.shopArrowFade = 0;
    s.shopFade = 1; this.emitState();
    const sessionId = s.gameSessionId;
    setTimeout(() => {
      if (this.state.gameSessionId !== sessionId) return;
      this.stopSound(SHOP_SOUNDS.SHOP_ARROW_BEEP);
      this.stopSound(SHOP_SOUNDS.SHOP_ENTER);
      s.enteringShop = false;
      s.inShop = true; s.shopVisits++;
      s.enemies.forEach(e => { this.clearEnemyShieldElements(e); if (e.el) e.el.remove(); }); s.enemies = [];
      s.enemyBullets.forEach(b => b.el.remove()); s.enemyBullets = [];
      s.bullets.forEach(b => b.el.remove()); s.bullets = [];
      s.preShopX = s.x; s.preShopY = s.y; s.x = SHOP_AREA_X; s.y = SHOP_AREA_Y; s.vx = 0; s.vy = 0; s.keys = {};
      s.cameraX = s.x - this.getSpawnScreenWidth() / 2; s.cameraY = s.y - this.getSpawnScreenHeight() / 2; s.shopEnterTime = Date.now();
      this.createPhysicalShopItems();
      const el = document.createElement('img'); el.src = DOOR_ANIM_FRAMES[0];
      el.style.cssText = `width:${SHOP_SPRITE_SIZE}px;position:absolute;z-index:500;pointer-events:none;user-select:none;-webkit-user-drag:none;`; this.container.appendChild(el); s.shopExitEl = el;
      s.exitDoorAnimFrame = 0; s.exitDoorAnimPlayed = false; s.exitDoorAnimTimer = 0;
      s.shopFade = 0; s.shopOverlayVisible = false;
      this.playShopMusic(); this.emitState();
    }, SHOP_FADE_DURATION);
  }

  public buyEnchantment(id: string) {
    const s = this.state; if (!s.inShop) return;
    const enchant = ENCHANTMENTS.find(e => e.id === id); if (!enchant) return;
    if (this.isEnchantmentMaxed(id)) return;
    const level = s.enchantmentLevels[id] || 0; const price = getEnchantmentPrice(enchant, level);
    if (s.coins < price) return; s.coins -= price; s.enchantmentLevels[id] = level + 1;
    switch (id) {
      case 'bulletSize': s.bulletSize = clamp(roundToStep(DEFAULTS.BULLET_SIZE + s.enchantmentLevels[id] * 2, 0.01), DEV_STAT_LIMITS.bulletSize.min, DEV_STAT_LIMITS.bulletSize.max); this.rebuildShieldSystem(); break;
      case 'bulletSpeed': s.bulletSpeed = clamp(roundToStep(DEFAULTS.BULLET_SPEED + s.enchantmentLevels[id] * 2.2, 0.01), DEV_STAT_LIMITS.bulletSpeed.min, DEV_STAT_LIMITS.bulletSpeed.max); break;
      case 'fireRate': s.fireRate = clamp(roundToStep(DEFAULTS.FIRE_RATE + s.enchantmentLevels[id] * 5.4, 0.01), DEV_STAT_LIMITS.fireRate.min, DEV_STAT_LIMITS.fireRate.max); s.fireDelay = 1000 / s.fireRate; break;
      case 'playerSpeed': s.acceleration = clamp(roundToStep(DEFAULTS.ACCELERATION + s.enchantmentLevels[id] * 0.29, 0.01), DEV_STAT_LIMITS.acceleration.min, DEV_STAT_LIMITS.acceleration.max); break;
      case 'multishot': s.multishot = clamp(DEFAULTS.MULTISHOT + s.enchantmentLevels[id] * 1, DEV_STAT_LIMITS.multishot.min, DEV_STAT_LIMITS.multishot.max); this.updatePlayerSprite(); this.rebuildShieldSystem(); break;
      case 'fireshot': s.fireshot = clamp(DEFAULTS.FIRESHOT + s.enchantmentLevels[id] * 1, DEV_STAT_LIMITS.fireshot.min, DEV_STAT_LIMITS.fireshot.max); this.updatePlayerSprite(); this.rebuildShieldSystem(); break;
      case 'piercing': s.bulletPierce = clamp(DEFAULTS.PIERCE + s.enchantmentLevels[id] * 1, DEV_STAT_LIMITS.bulletPierce.min, DEV_STAT_LIMITS.bulletPierce.max); break;
      case 'shield': s.shield = clamp(DEFAULTS.SHIELD + s.enchantmentLevels[id] * 1, DEV_STAT_LIMITS.shield.min, DEV_STAT_LIMITS.shield.max); this.rebuildShieldSystem(); break;
      case 'maxLives': s.maxLives = clamp(s.maxLives + 1, DEV_STAT_LIMITS.maxLives.min, DEV_STAT_LIMITS.maxLives.max); s.lives = clamp(s.lives + 1, 0, s.maxLives); break;
      case 'life': s.lives = clamp(s.lives + 1, 0, s.maxLives); break;
    }
    if (SHOP_SOUNDS.BUY_ITEM) this.playSound(SHOP_SOUNDS.BUY_ITEM);
    this.refreshPhysicalShopItems();
    this.emitState();
  }

  public exitShop() {
    const s = this.state;
    if (SHOP_SOUNDS.SHOP_EXIT) this.playSound(SHOP_SOUNDS.SHOP_EXIT);
    s.shopFade = 1; this.emitState();
    s.postShopSpawnDelay = true;
    if (s.shopMusic) { s.shopMusic.pause(); s.shopMusic = null; }
    const sessionId = s.gameSessionId;
    setTimeout(() => {
      if (this.state.gameSessionId !== sessionId) return;
      s.inShop = false; s.shopOverlayVisible = false;
      if (s.shopExitEl) { s.shopExitEl.remove(); s.shopExitEl = null; }
      this.clearPhysicalShopItems();
      s.screenScale *= SHOP_SCREEN_WIDEN_FACTOR;
      this.applyScreenScale();
      s.x = s.preShopX; s.y = s.preShopY; s.vx = 0; s.vy = 0; s.keys = {};
      s.cameraX = s.x - this.getSpawnScreenWidth() / 2; s.cameraY = s.y - this.getSpawnScreenHeight() / 2;
      this.assignShopUnlockMissions(); this.emitState();
      requestAnimationFrame(() => { if (this.state.gameSessionId !== sessionId) return; s.shopFade = 0; this.emitState(); });
      this.playRandomMusic();
      setTimeout(() => { if (this.state.gameSessionId !== sessionId) return; s.postShopSpawnDelay = false; s.lastSpawnTime = Date.now(); s.nextSpawnInterval = this.getSpawnInterval(); }, 2000);
    }, SHOP_FADE_DURATION);
  }

  public cleanUpOldGameSession() {
    const s = this.state;
    s.enemies.forEach(e => { this.clearEnemyShieldElements(e); if (e.el) e.el.remove(); }); s.bullets.forEach(b => b.el.remove()); s.enemyBullets.forEach(eb => eb.el.remove()); s.explosions.forEach(ex => ex.el.remove()); s.particles.forEach(p => p.el.remove()); this.clearShieldElements();
    s.enemies = []; s.bullets = []; s.enemyBullets = []; s.explosions = []; s.particles = []; s.gameSessionId++;
    s.inShop = false; s.enteringShop = false; s.shopEntranceActive = false; s.shopVisits = 0; s.screenScale = 1; s.lastShopArrowBeepTime = 0; this.applyScreenScale(); this.clearPhysicalShopItems();
    s.shopUnlockMissions = []; s.shopMissionTier = 1; s.usedMissionIds = { 1: [], 2: [], 3: [], 4: [] };
    if (s.shopEntranceEl) { s.shopEntranceEl.remove(); s.shopEntranceEl = null; }
    if (s.shopExitEl) { s.shopExitEl.remove(); s.shopExitEl = null; }
    if (s.shopArrowEl) { s.shopArrowEl.remove(); s.shopArrowEl = null; }
    if (s.shopArrowTextEl) { s.shopArrowTextEl.remove(); s.shopArrowTextEl = null; }
    if (s.shopTitleEl) { s.shopTitleEl.remove(); s.shopTitleEl = null; }
    s.shopFade = 0; s.postShopSpawnDelay = false; s.shopOverlayVisible = false; s.enchantmentLevels = {};
    s.lastSpawnTime = 0; s.nextSpawnInterval = 2500;
    if (s.shopMusic) { s.shopMusic.pause(); s.shopMusic = null; }
    s.entranceDoorAnimFrame = 0; s.entranceDoorAnimPlayed = false; s.exitDoorAnimFrame = 0; s.exitDoorAnimPlayed = false;
    s.missionProgress = { visible: false, text: '', progress: 0, target: 0 }; clearTimeout(this.missionPopupTimer); s.missionPopup = { title: '', desc: '', visible: false };
    s.acceleration = DEFAULTS.ACCELERATION; s.friction = DEFAULTS.FRICTION; s.bulletSpeed = DEFAULTS.BULLET_SPEED; s.bulletSize = DEFAULTS.BULLET_SIZE;
    s.fireRate = DEFAULTS.FIRE_RATE; s.bulletPierce = DEFAULTS.PIERCE; s.multishot = DEFAULTS.MULTISHOT; s.fireshot = DEFAULTS.FIRESHOT; s.shield = DEFAULTS.SHIELD;
    s.fireDelay = 1000 / s.fireRate; s.coins = 0; s.maxLives = DEFAULTS.MAX_LIVES; s.lives = DEFAULTS.LIVES;
    s.vx = 0; s.vy = 0; s.keys = {}; s.x = 900; s.y = 400; s.cameraX = 0; s.cameraY = 0;
    s.activePlaytime = 0; s.lastTimestamp = Date.now(); s.playerAnimTimer = 0; s.playerAnimFrame = 0; s.shieldRespawnTimer = 0;
    s.devUnlocked = false; s.showDevPassword = false; s.activeMissions = []; s.completedMissions = [];
    this.updatePlayerSprite(); s.isDead = false; s.isPaused = false; s.showDeathScreen = false;
    s.deathMessage = ''; s.scoreMessage = ''; s.hitFlash = false;
    this.stopSound(SHOP_SOUNDS.SHOP_ARROW_BEEP); this.stopSound(SHOP_SOUNDS.SHOP_ENTER);
    this.playingSounds = [];
    if (s.currentMusic) { s.currentMusic.pause(); s.currentMusic = null; }
    this.biomeCache.clear();
    this.rawBiomeCache.clear();
    this.biomeSeedT = Math.random() * 10000;
    this.biomeSeedM = Math.random() * 10000;
    this.biomeSeedL = Math.random() * 10000;
    this.emitState();
  }

  public startGame() {
    const s = this.state; if (s.gameStarted) return;
    this.playSound(SOUNDS.BUTTON_CLICK); this.cleanUpOldGameSession(); this.generateBiomes();
    const spawnPos = this.findSafeSpawnPosition();
    s.x = spawnPos.x;
    s.y = spawnPos.y;
    s.cameraX = s.x - window.innerWidth / 2;
    s.cameraY = s.y - window.innerHeight / 2;
    this.updateActiveMissions(); this.assignShopUnlockMissions();
    s.gameStarted = true; this.playerEl.style.visibility = 'visible'; this.testBoxEl.style.visibility = 'visible';
    this.playSound(SOUNDS.STARTUP, 0.6);
    setTimeout(() => this.playRandomMusic(), 800);
    s.lastSpawnTime = Date.now(); s.nextSpawnInterval = this.getSpawnInterval();
    this.emitState();
  }

  public restart() {
    const s = this.state; this.playSound(SOUNDS.BUTTON_CLICK); this.cleanUpOldGameSession();
    s.gameStarted = false; this.playerEl.style.visibility = 'hidden'; this.testBoxEl.style.visibility = 'hidden'; this.emitState();
  }

  public togglePause() {
    const s = this.state; if (!s.gameStarted || s.isDead || s.showDevPassword) return;
    this.playSound(SOUNDS.BUTTON_CLICK); s.isPaused = !s.isPaused;
    if (s.isPaused) { if (s.currentMusic) s.currentMusic.pause(); if (s.shopMusic) s.shopMusic.pause(); }
    else { s.lastTimestamp = Date.now(); s.lastFrameTime = performance.now(); s.lastSpawnTime = Date.now(); if (s.inShop && s.shopMusic) s.shopMusic.play().catch(() => { }); else if (s.currentMusic) s.currentMusic.play().catch(() => { }); }
    this.emitState();
  }

  public openDevPassword() { const s = this.state; if (s.devUnlocked) return; this.playSound(SOUNDS.BUTTON_CLICK); s.showDevPassword = true; this.emitState(); }
  public cancelDevPassword() { const s = this.state; this.playSound(SOUNDS.BUTTON_CLICK); s.showDevPassword = false; s.isPaused = true; this.emitState(); }
  public checkDevPassword(password: string) { const s = this.state; this.playSound(SOUNDS.BUTTON_CLICK); if (password === DEV_PASSWORD) { s.devUnlocked = true; s.showDevPassword = false; s.isPaused = true; this.emitState(); return true; } return false; }

  public closeEnemiesPopup() {
    this.playSound(SOUNDS.BUTTON_CLICK);
    this.state.enemiesPopupVisible = false;
    this.emitState();
  }

  public setDevValue(key: string, value: number) {
    const s = this.state; const limit = (DEV_STAT_LIMITS as any)[key]; if (limit) value = clamp(roundToStep(value, limit.step), limit.min, limit.max);
    switch (key) {
      case 'acceleration': s.acceleration = value; break;
      case 'friction': s.friction = value; break;
      case 'bulletSpeed': s.bulletSpeed = value; break;
      case 'bulletSize': s.bulletSize = value; this.rebuildShieldSystem(); break;
      case 'fireRate': s.fireRate = value; s.fireDelay = 1000 / value; break;
      case 'bulletPierce': s.bulletPierce = value; break;
      case 'multishot': s.multishot = value; this.updatePlayerSprite(); this.rebuildShieldSystem(); break;
      case 'fireshot': s.fireshot = value; this.updatePlayerSprite(); this.rebuildShieldSystem(); break;
      case 'shield': s.shield = value; this.rebuildShieldSystem(); break;
      case 'maxLives': s.maxLives = value; if (s.lives > s.maxLives) s.lives = s.maxLives; break;
      case 'lives': s.lives = clamp(roundToStep(value, 1), 0, s.maxLives); break;
      case 'coins': s.coins = value; break;
    }
    this.emitState();
  }

  public skipMission() { const s = this.state; if (!s.devUnlocked) return; this.playSound(SOUNDS.BUTTON_CLICK); s.shopUnlockMissions.forEach(sm => { if (!s.completedMissions.includes(sm.id)) { s.completedMissions.push(sm.id); } }); s.activeMissions = s.activeMissions.filter(m => !s.shopUnlockMissions.some(sm => sm.id === m.id)); s.shopUnlockMissions = []; this.spawnShopEntrance(); }

  public handleKeyDown(e: KeyboardEvent) {
    const s = this.state;
    this.resumeMusic();
    if (!s.gameStarted || s.isDead || s.showDevPassword) return;
    if (e.key.toLowerCase() === 'p' || e.key === 'Escape') { this.togglePause(); return; }

    // Dev Mode tools for water transition alignment offset
    if (s.devUnlocked) {
      if (e.key === '[') {
        const current = parseInt(localStorage.getItem('waterRestOffset') || '3', 10);
        const next = (current - 1 + 9) % 9;
        localStorage.setItem('waterRestOffset', next.toString());
        console.log('Dev: Adjusted waterRestOffset to', next);
        this.emitState();
        return;
      } else if (e.key === ']') {
        const current = parseInt(localStorage.getItem('waterRestOffset') || '3', 10);
        const next = (current + 1) % 9;
        localStorage.setItem('waterRestOffset', next.toString());
        console.log('Dev: Adjusted waterRestOffset to', next);
        this.emitState();
        return;
      }
    }

    if (s.isPaused) return;
    s.keys[e.key] = true;
    if (e.key === ' ') { this.shootBullet(); e.preventDefault(); }
  }
  public handleKeyUp(e: KeyboardEvent) { const s = this.state; if (!s.gameStarted || s.isPaused || s.isDead || s.showDevPassword) return; s.keys[e.key] = false; }
  public handleMouseMove(e: MouseEvent) { const s = this.state; if (!s.gameStarted || s.isPaused || s.isDead || s.showDevPassword) return; s.mouseX = e.clientX * s.screenScale; s.mouseY = e.clientY * s.screenScale; }
  public handleMouseDown(e: MouseEvent) { if (e.button === 2) { e.preventDefault(); e.stopPropagation(); return; } this.resumeMusic(); const s = this.state; if (!s.gameStarted || s.isPaused || s.isDead || s.showDevPassword) return; s.mouseX = e.clientX * s.screenScale; s.mouseY = e.clientY * s.screenScale; const target = e.target as HTMLElement; if (target.closest('button') || target.closest('input') || target.closest('[data-ui]')) return; e.preventDefault(); this.shootBullet(); }
  public handleContextMenu(e: MouseEvent) { e.preventDefault(); e.stopPropagation(); return false; }
  public preventNativeDrag(e: DragEvent) { const target = e.target as HTMLElement; if (target.closest && target.closest('input')) return; e.preventDefault(); }
  public preventBrowserZoom(e: any) {
    const key = (e.key || '').toLowerCase();
    const isZoomKey = e.type === 'keydown' && (e.ctrlKey || e.metaKey) && ['+', '=', '-', '_', '0'].includes(key);
    const isZoomWheel = e.type === 'wheel' && (e.ctrlKey || e.metaKey);
    const isGesture = e.type && e.type.startsWith('gesture');
    
    if (isZoomKey || isZoomWheel || isGesture) {
      e.preventDefault();
      e.stopPropagation();
      
      if (isZoomWheel && this.state.devUnlocked) {
        if (e.deltaY < 0) {
          // Zoom in: decrease screenScale (makes the viewport larger/closer)
          this.state.screenScale = Math.max(0.25, this.state.screenScale - 0.05);
        } else if (e.deltaY > 0) {
          // Zoom out: increase screenScale (makes the viewport smaller/further)
          this.state.screenScale = Math.min(5.0, this.state.screenScale + 0.05);
        }
        this.handleResize();
        this.emitState();
      }
    }
  }
  public handleBlur() { const s = this.state; if (!s.isPaused && s.gameStarted && !s.isDead && !s.showDevPassword) this.togglePause(); }
  public handleResize() {
    this.applyScreenScale();
    const s = this.state;
    if (!s.gameStarted || s.isDead || s.isPaused) {
      const viewWidth = this.getSpawnScreenWidth(), viewHeight = this.getSpawnScreenHeight();
      s.cameraX = s.x - viewWidth / 2;
      s.cameraY = s.y - viewHeight / 2;
      this.playerEl.style.left = Math.round(s.x - s.cameraX) + 'px';
      this.playerEl.style.top = Math.round(s.y - s.cameraY) + 'px';
      if (s.shopEntranceActive && s.shopEntranceEl) {
        s.shopEntranceEl.style.left = Math.round(s.shopEntranceX - s.cameraX) + 'px';
        s.shopEntranceEl.style.top = Math.round(s.shopEntranceY - s.cameraY) + 'px';
      }
      if (s.inShop && s.shopExitEl) {
        s.shopExitEl.style.left = Math.round(s.shopExitX - s.cameraX) + 'px';
        s.shopExitEl.style.top = Math.round(s.shopExitY - s.cameraY) + 'px';
      }
      s.enemies.forEach(e => {
        if (e.el) {
          const offset = e.isElite ? (e.eliteOffset || 0) : 0;
          e.el.style.left = Math.round(e.x - offset - s.cameraX) + 'px';
          e.el.style.top = Math.round(e.y - offset - s.cameraY) + 'px';
        }
      });
      s.bullets.forEach(b => {
        if (b.el) {
          b.el.style.left = Math.round(b.x - (b.size / 2) - s.cameraX) + 'px';
          b.el.style.top = Math.round(b.y - (b.size / 2) - s.cameraY) + 'px';
        }
      });
      s.enemyBullets.forEach(b => {
        if (b.el) {
          b.el.style.left = Math.round(b.x - (b.size / 2) - s.cameraX) + 'px';
          b.el.style.top = Math.round(b.y - (b.size / 2) - s.cameraY) + 'px';
        }
      });
      if (s.inShop) {
        s.shopItemEls.forEach(item => {
          if (item.el) {
            item.el.style.left = Math.round(item.x - s.cameraX) + 'px';
            item.el.style.top = Math.round(item.y - s.cameraY) + 'px';
          }
        });
      }
    }
  }

  public update() {
    const s = this.state; const currentInstant = Date.now(); const perfNow = performance.now(); const dt = perfNow - s.lastFrameTime; s.lastFrameTime = perfNow;
    if (s.gameStarted && !s.isDead && !s.isPaused) { const delta = currentInstant - s.lastTimestamp; if (!s.inShop) s.activePlaytime += delta; if (s.fireshot > 0) { s.playerAnimTimer += dt; if (s.playerAnimTimer >= 250) { s.playerAnimTimer = 0; s.playerAnimFrame = (s.playerAnimFrame + 1) % 4; this.updatePlayerSprite(); } } }
    s.lastTimestamp = currentInstant;

    // Handle early exit for paused, dead, or transitioning states
    if (!s.gameStarted || s.isDead || s.isPaused || s.shopFade > 0) {
      if (s.gameStarted) {
        this.updateExplosions();
        this.updateParticles();
      }
      this.drawBiomes();
      this.animationId = requestAnimationFrame(this.update);
      return;
    }

    // 1. GAMEPLAY SIMULATION / PHYSICS POSITION UPDATES (First, calculate new coordinates)
    if (!s.inShop && !s.postShopSpawnDelay) { const now = Date.now(); if (now - s.lastSpawnTime >= s.nextSpawnInterval) { s.lastSpawnTime = now; s.nextSpawnInterval = this.getSpawnInterval(); this.doSpawn(); } }
    if (s.keys['w'] || s.keys['ArrowUp']) s.vy -= s.acceleration;
    if (s.keys['s'] || s.keys['ArrowDown']) s.vy += s.acceleration;
    if (s.keys['a'] || s.keys['ArrowLeft']) s.vx -= s.acceleration;
    if (s.keys['d'] || s.keys['ArrowRight']) s.vx += s.acceleration;
    s.vx *= s.friction; s.vy *= s.friction; s.x += s.vx; s.y += s.vy;
    if (Math.hypot(s.vx, s.vy) > 0.3 && !s.inShop && s.maxParticles > 0) {
      const pSpawnProb = (s.maxParticles / 80) * 0.45;
      if (Math.random() < pSpawnProb) {
        this.spawnPlayerParticle();
      }
    }

    // 2. CAMERA POSITION UPDATE (Update camera based on newly simulated positions)
    const viewWidth = this.getSpawnScreenWidth(), viewHeight = this.getSpawnScreenHeight();
    s.cameraX += (s.x - s.cameraX - viewWidth / 2) * 0.1; s.cameraY += (s.y - s.cameraY - viewHeight / 2) * 0.1;

    // 3. VISUAL POSITION UPDATES & RENDERING (Now position everything using the updated camera)
    this.drawBiomes();
    this.testBoxEl.style.left = Math.round(1200 - s.cameraX) + 'px'; this.testBoxEl.style.top = Math.round(400 - s.cameraY) + 'px';
    this.updateExplosions();
    this.updateParticles();

    this.playerEl.style.left = Math.round(s.x - s.cameraX) + 'px'; this.playerEl.style.top = Math.round(s.y - s.cameraY) + 'px';
    const mouseAng = Math.atan2(s.mouseY - (s.y - s.cameraY + s.centerOffsetY), s.mouseX - (s.x - s.cameraX + s.centerOffsetX));
    this.playerEl.style.transform = `rotate(${mouseAng}rad)`;
    const px = s.x + s.centerOffsetX, py = s.y + s.centerOffsetY;
    if (s.shopEntranceActive && s.shopEntranceEl) {
      s.shopEntranceEl.style.left = Math.round(s.shopEntranceX - s.cameraX) + 'px'; s.shopEntranceEl.style.top = Math.round(s.shopEntranceY - s.cameraY) + 'px';
      const distToDoor = Math.hypot(px - s.shopEntranceX, py - s.shopEntranceY); const openThreshold = 500;
      s.entranceDoorAnimTimer += dt;
      if (s.entranceDoorAnimTimer >= 80) { s.entranceDoorAnimTimer -= 80; if (distToDoor < openThreshold && s.entranceDoorAnimFrame < DOOR_ANIM_FRAMES.length - 1) { s.entranceDoorAnimFrame++; s.shopEntranceEl.src = DOOR_ANIM_FRAMES[s.entranceDoorAnimFrame]; } else if (distToDoor >= openThreshold && s.entranceDoorAnimFrame > 0) { s.entranceDoorAnimFrame--; s.shopEntranceEl.src = DOOR_ANIM_FRAMES[s.entranceDoorAnimFrame]; } }
      if (this.isCollision(px, py, PLAYER_HITBOX_SIZE, s.shopEntranceX, s.shopEntranceY, SHOP_SPRITE_SIZE)) { this.enterShop(); }
    }
    if (s.inShop && s.shopExitEl) {
      s.shopExitEl.style.left = Math.round(s.shopExitX - s.cameraX) + 'px'; s.shopExitEl.style.top = Math.round(s.shopExitY - s.cameraY) + 'px';
      const exitCenterX = s.shopExitX + SHOP_SPRITE_SIZE / 2, exitCenterY = s.shopExitY + SHOP_SPRITE_SIZE / 2;
      const distToExit = Math.hypot(px - exitCenterX, py - exitCenterY); const exitThreshold = 250;
      s.exitDoorAnimTimer += dt;
      if (s.exitDoorAnimTimer >= 80) { s.exitDoorAnimTimer -= 80; if (distToExit < exitThreshold && s.exitDoorAnimFrame < DOOR_ANIM_FRAMES.length - 1) { s.exitDoorAnimFrame++; s.shopExitEl.src = DOOR_ANIM_FRAMES[s.exitDoorAnimFrame]; } else if (distToExit >= exitThreshold && s.exitDoorAnimFrame > 0) { s.exitDoorAnimFrame--; s.shopExitEl.src = DOOR_ANIM_FRAMES[s.exitDoorAnimFrame]; } }
      if (Date.now() - s.shopEnterTime > 1500 && this.isCollision(px, py, PLAYER_HITBOX_SIZE, exitCenterX, exitCenterY, SHOP_SPRITE_SIZE)) { this.exitShop(); }
    }
    if (s.inShop && s.shopItemEls.length > 0) this.positionPhysicalShopItems();
    if (s.shopEntranceActive && !s.enteringShop && !s.inShop && s.shopArrowEl && s.shopArrowTextEl) {
      const distToDoor = Math.hypot(px - s.shopEntranceX, py - s.shopEntranceY);
      const showArrow = distToDoor > 600;
      if (showArrow) {
        s.shopArrowFade = Math.min(1.0, (s.shopArrowFade || 0) + dt / 300);
      } else {
        s.shopArrowFade = Math.max(0.0, (s.shopArrowFade || 0) - dt / 300);
      }
      if (s.shopArrowFade > 0) {
        const pulseOpacity = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(Date.now() / 250));
        const finalOpacity = s.shopArrowFade * pulseOpacity;
        s.shopArrowEl.style.opacity = String(finalOpacity);
        s.shopArrowTextEl.style.opacity = String(finalOpacity);
        const ang = Math.atan2(s.shopEntranceY - s.y, s.shopEntranceX - s.x);
        const cx = viewWidth / 2, cy = viewHeight / 2;
        const arrowDist = 250;
        const ax = cx + Math.cos(ang) * arrowDist, ay = cy + Math.sin(ang) * arrowDist;
        s.shopArrowEl.style.left = (ax - 20) + 'px'; s.shopArrowEl.style.top = (ay - 20) + 'px'; s.shopArrowEl.style.transform = `rotate(${ang}rad)`;
        s.shopArrowTextEl.style.left = (ax - 80) + 'px'; s.shopArrowTextEl.style.top = (ay + 30) + 'px';
        if (showArrow && SHOP_SOUNDS.SHOP_ARROW_BEEP && Date.now() - s.lastShopArrowBeepTime >= SHOP_ARROW_BEEP_INTERVAL) { s.lastShopArrowBeepTime = Date.now(); this.playSound(SHOP_SOUNDS.SHOP_ARROW_BEEP); }
      } else {
        s.shopArrowEl.style.opacity = '0';
        s.shopArrowTextEl.style.opacity = '0';
      }
    }
    const currentActiveSize = (s.fireshot > 0) ? Math.max(s.bulletSize * 1.5, 32) : s.bulletSize;
    if (s.shield > 0 && s.shieldBullets.length === 0) { s.shieldRespawnTimer += dt; if (s.shieldRespawnTimer >= 3000) { s.shieldRespawnTimer = 0; this.rebuildShieldSystem(); } } else { s.shieldRespawnTimer = 0; }
    const orbitSpeed = 0.03;
    for (const e of s.enemies) { if (!e.isUnloaded && this.isOnScreen(e.x, e.y, 220)) this.updateEnemyShields(e, dt, px, py); }

    for (let i = s.shieldBullets.length - 1; i >= 0; i--) {
      const sb = s.shieldBullets[i]; sb.offset += orbitSpeed * sb.spinDir;
      const orbitRadius = (sb.ring === 'inner') ? 75 : 135; const sbWorldX = px + Math.cos(sb.offset) * orbitRadius, sbWorldY = py + Math.sin(sb.offset) * orbitRadius;
      if (s.fireshot > 0) { sb.animTimer += dt; if (sb.animTimer >= 200) { sb.animTimer = 0; sb.animFrame = (sb.animFrame + 1) % BULLET_ANIMS.length; sb.el.src = BULLET_ANIMS[sb.animFrame]; } } else { if (sb.el.src !== DEFAULT_BULLET_SPRITE) sb.el.src = DEFAULT_BULLET_SPRITE; }
      sb.el.style.left = Math.round(sbWorldX - (sb.size / 2) - this.state.cameraX) + 'px'; sb.el.style.top = Math.round(sbWorldY - (sb.size / 2) - this.state.cameraY) + 'px';

      const bulletFacingAngle = (sb.spinDir === 1) ? (sb.offset + Math.PI / 2) : (sb.offset - Math.PI / 2);
      sb.el.style.transform = `rotate(${bulletFacingAngle}rad)`;

      let isDestroyed = false;
      for (let j = s.enemies.length - 1; j >= 0; j--) {
        const e = s.enemies[j]; if (!e) continue; const eSize = this.getEnemySize(e); if (sb.hitEnemies.includes(e.id)) continue;
        if (this.isCollision(sbWorldX, sbWorldY, sb.size, e.x, e.y, eSize)) {
          // Mimic Cooldown handling for shield hit
          if (e.type.isMimic) {
            const now = Date.now();
            if (now - (e.lastHitTime || 0) < HIT_COOLDOWN) {
              continue;
            }
            e.lastHitTime = now;
          }

          e.health -= 1; e.lastDamageTime = Date.now(); sb.hitEnemies.push(e.id);
          if (s.fireshot > 0) this.triggerFireshotSplit(e.x, e.y, eSize);
          if (e.type.name === 'Magic Mob' && !e.isClone) {
            if (!e.hasSplit) {
              e.hasSplit = true;
              this.spawnMagicClones(e);
            } else {
              this.damageMagicClones(e);
            }
          }
          if (e.health <= 0) { this._killEnemy(e, j, 'shield'); }
          sb.pierceLeft--;
          this.triggerMissionEvent('shield_block', 1);
          sb.el.style.opacity = (sb.pierceLeft / sb.maxPierce).toString();
          if (sb.pierceLeft <= 0) {
            sb.el.remove();
            s.shieldBullets.splice(i, 1);
            isDestroyed = true;
            if (s.shieldBullets.length === 0) {
              s.shield = 0;
              this.emitState();
            }
            break;
          }
        }
      }
      if (isDestroyed) continue;
      for (let k = s.enemyBullets.length - 1; k >= 0; k--) { const mb = s.enemyBullets[k]; const mbSize = mb.size || 20; if (this.isCollision(sbWorldX, sbWorldY, sb.size, mb.x, mb.y, mbSize)) { mb.el.remove(); s.enemyBullets.splice(k, 1); sb.pierceLeft--; this.triggerMissionEvent('shield_block', 1); this.triggerMissionEvent('shield_magic', 1); sb.el.style.opacity = (sb.pierceLeft / sb.maxPierce).toString(); if (sb.pierceLeft <= 0) { sb.el.remove(); s.shieldBullets.splice(i, 1); if (s.shieldBullets.length === 0) { s.shield = 0; this.emitState(); } break; } } }
    }

    // 1. Move all bullets
    for (const b of s.bullets) {
      b.x += b.vx;
      b.y += b.vy;
      if (s.fireshot > 0 && s.maxParticles > 0) {
        // Performance optimization: scale down particle spawn probability when there are many bullets
        const bSpawnChance = ((s.maxParticles / 80) * 0.12) / Math.max(1, s.bullets.length / 4);
        if (Math.random() < bSpawnChance) {
          this.spawnBulletParticle(b.x, b.y);
        }
      }
    }
    for (const eb of s.enemyBullets) {
      eb.x += eb.vx;
      eb.y += eb.vy;
    }

    // 2. Resolve bullet-bullet collisions with accurate physics (mass proportional to size squared)
    const resolveBulletBounce = (b1: any, b2: any, size1: number, size2: number, isB1PiercingPlayer: boolean = false, isB2PiercingPlayer: boolean = false) => {
      const minDist = (size1 + size2) / 2;
      const dx = b1.x - b2.x;
      if (Math.abs(dx) >= minDist) return;
      const dy = b1.y - b2.y;
      if (Math.abs(dy) >= minDist) return;

      const distSq = dx * dx + dy * dy;
      const minDistSq = minDist * minDist;

      if (distSq < minDistSq && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        // Resolve overlap
        const overlap = minDist - dist;
        const pushX = (dx / dist) * overlap;
        const pushY = (dy / dist) * overlap;

        if (isB1PiercingPlayer && !isB2PiercingPlayer) {
          // b1 is piercing: b2 gets pushed away, b1 stays unaffected
          b2.x -= pushX;
          b2.y -= pushY;
        } else if (isB2PiercingPlayer && !isB1PiercingPlayer) {
          // b2 is piercing: b1 gets pushed away, b2 stays unaffected
          b1.x += pushX;
          b1.y += pushY;
        } else {
          // Both are piercing or neither are: standard 50-50 split push
          b1.x += pushX * 0.5;
          b1.y += pushY * 0.5;
          b2.x -= pushX * 0.5;
          b2.y -= pushY * 0.5;
        }

        // Mass based on area
        const m1 = size1 * size1;
        const m2 = size2 * size2;

        const dvx = b1.vx - b2.vx;
        const dvy = b1.vy - b2.vy;
        const dotProduct = dvx * dx + dvy * dy;

        // Only bounce if they are moving towards each other
        if (dotProduct < 0) {
          if (isB1PiercingPlayer && !isB2PiercingPlayer) {
            // b1 is piercing: b1 is unaffected. b2 absorbs all kinetic transfer (infinite mass approximation for b1)
            const factor2 = (2 * dotProduct) / distSq;
            b2.vx += factor2 * dx;
            b2.vy += factor2 * dy;
          } else if (isB2PiercingPlayer && !isB1PiercingPlayer) {
            // b2 is piercing: b2 is unaffected. b1 absorbs all kinetic transfer
            const factor1 = (2 * dotProduct) / distSq;
            b1.vx -= factor1 * dx;
            b1.vy -= factor1 * dy;
          } else {
            // Standard elastic collision
            const factor = (2 * dotProduct) / (distSq * (m1 + m2));
            b1.vx -= factor * m2 * dx;
            b1.vy -= factor * m2 * dy;
            b2.vx += factor * m1 * dx;
            b2.vy += factor * m1 * dy;
          }

          // Re-align drawing angles to match new velocity vectors
          b1.angle = Math.atan2(b1.vy, b1.vx);
          b2.angle = Math.atan2(b2.vy, b2.vx);
        }
      }
    };

    // Cross bounces (player vs enemy bullets)
    for (let i = 0; i < s.bullets.length; i++) {
      const pb = s.bullets[i];
      const s1 = pb.isFireSplit ? Math.max(s.bulletSize * 1.5, 32) : currentActiveSize;
      const pbIsPierce = pb.pierceLeft > 0;
      for (let j = 0; j < s.enemyBullets.length; j++) {
        const eb = s.enemyBullets[j];
        const s2 = eb.size || 20;
        resolveBulletBounce(pb, eb, s1, s2, pbIsPierce, false);
      }
    }

    bulletLoop:
    for (let i = s.bullets.length - 1; i >= 0; i--) {
      const b = s.bullets[i];
      const currentSize = b.isFireSplit ? Math.max(s.bulletSize * 1.5, 32) : currentActiveSize;
      if (b.x < s.cameraX - 300 || b.x > s.cameraX + viewWidth + 300 || b.y < s.cameraY - 300 || b.y > s.cameraY + viewHeight + 300) { b.el.remove(); s.bullets.splice(i, 1); continue; }
      if (s.fireshot > 0) {
        b.animTimer += dt;
        if (b.animTimer >= 200) {
          b.animTimer = 0;
          b.animFrame = (b.animFrame + 1) % BULLET_ANIMS.length;
          b.el.src = BULLET_ANIMS[b.animFrame];
        }
      } else {
        if (b.el.src !== DEFAULT_BULLET_SPRITE) b.el.src = DEFAULT_BULLET_SPRITE;
        b.angle += 0.008 * dt;
      }
      b.el.style.left = Math.round(b.x - (currentSize / 2) - s.cameraX) + 'px'; b.el.style.top = Math.round(b.y - (currentSize / 2) - s.cameraY) + 'px'; b.el.style.transform = `rotate(${b.angle}rad)`;
      for (let j = s.enemies.length - 1; j >= 0; j--) {
        const e = s.enemies[j]; if (!e) continue; const eSize = this.getEnemySize(e);
        if (b.hitEnemies.includes(e.id)) continue;
        if (this.damageEnemyShield(e, b.x, b.y, currentSize, b.id)) {
          if (b.pierceLeft > 0) { b.pierceLeft--; } else { b.el.remove(); s.bullets.splice(i, 1); continue bulletLoop; }
          continue;
        }
        if (this.isCollision(b.x, b.y, currentSize, e.x, e.y, eSize)) {
          // Mimic Cooldown handling for bullet hit
          if (e.type.isMimic) {
            const now = Date.now();
            if (now - (e.lastHitTime || 0) < HIT_COOLDOWN) {
              continue;
            }
            e.lastHitTime = now;
          }

          e.health -= 1; e.lastDamageTime = Date.now(); b.hitEnemies.push(e.id);
          if (!b.isFireSplit) this.triggerFireshotSplit(e.x, e.y, eSize);
          if (e.type.name === 'Magic Mob' && !e.isClone) {
            if (!e.hasSplit) {
              e.hasSplit = true;
              this.spawnMagicClones(e);
            } else {
              this.damageMagicClones(e);
            }
          }
          if (e.health <= 0) { this._killEnemy(e, j, 'bullet', b); }
          if (b.pierceLeft > 0) { b.pierceLeft--; } else { b.el.remove(); s.bullets.splice(i, 1); continue bulletLoop; }
        }
      }
    }

    for (let i = s.enemyBullets.length - 1; i >= 0; i--) {
      const b = s.enemyBullets[i]; const bSize = b.size || 20;
      if (b.animFrames) { b.animTimer += dt; if (b.animTimer >= 200) { b.animTimer = 0; b.animFrame = (b.animFrame + 1) % b.animFrames.length; b.el.src = b.animFrames[b.animFrame]; } }
      if (this.isCollision(b.x, b.y, bSize, px, py, PLAYER_HITBOX_SIZE)) { this.takeDamage(b.source || 'Enemy Projectile'); b.el.remove(); s.enemyBullets.splice(i, 1); continue; }
      
      if (b.spinAngle !== undefined && b.spinSpeed !== undefined) {
        b.spinAngle += b.spinSpeed * dt;
      }
      const rotVal = b.spinAngle !== undefined ? b.spinAngle : (b.angle || Math.atan2(b.vy, b.vx));
      b.el.style.left = Math.round(b.x - (bSize / 2) - this.state.cameraX) + 'px'; b.el.style.top = Math.round(b.y - (bSize / 2) - this.state.cameraY) + 'px'; b.el.style.transform = `rotate(${rotVal}rad)`;
      if (b.x < s.cameraX - 200 || b.x > s.cameraX + viewWidth + 200 || b.y < s.cameraY - 200 || b.y > s.cameraY + viewHeight + 200) { b.el.remove(); s.enemyBullets.splice(i, 1); }
    }

    for (let i = s.enemies.length - 1; i >= 0; i--) {
      const e = s.enemies[i];
      if (!e) continue;

      // Despawn far away enemies (giving 0 coins) to free up the mob cap
      const dx = s.x - e.x;
      const dy = s.y - e.y;
      const dist = Math.hypot(dx, dy);
      const despawnDist = Math.max(2200, this.getSpawnScreenWidth() * 1.5);
      if (dist > despawnDist) {
        if (e.el) e.el.remove();
        this.clearEnemyShieldElements(e);
        s.enemies.splice(i, 1);
        continue;
      }

      if (e.health <= 0) {
        this._killEnemy(e, i, 'bullet');
        continue;
      }

      const visible = this.isOnScreen(e.x, e.y, 200);

      if (visible) {
        if (e.isUnloaded) {
          e.el = this.createEnemyElement(e);
          e.isUnloaded = false;
          this.syncEnemyShieldSystem(e);
        }

        if (e.isClone && e.cloneAnimating) {
          const elapsed = Date.now() - (e.cloneSpawnTime || 0);
          const progress = Math.min(elapsed / CLONE_ANIMATION_DURATION, 1);
          const eased = progress * (2 - progress);
          const targetX = (e.cloneStartX || 0) + Math.cos(e.cloneAngle || 0) * CLONE_FINAL_RADIUS;
          const targetY = (e.cloneStartY || 0) + Math.sin(e.cloneAngle || 0) * CLONE_FINAL_RADIUS;
          e.x = (e.cloneStartX || 0) + (targetX - (e.cloneStartX || 0)) * eased;
          e.y = (e.cloneStartY || 0) + (targetY - (e.cloneStartY || 0)) * eased;
          if (progress >= 1) e.cloneAnimating = false;
        } else {
          const dx = s.x - e.x, dy = s.y - e.y;
          const dist = Math.hypot(dx, dy) || 1;
          const enemySpeed = e.isPrimed ? 0 : this.getEnemySpeed(e);
          e.x += (dx / dist) * enemySpeed;
          e.y += (dy / dist) * enemySpeed;
        }

        const eSize = this.getEnemySize(e);
        if (e.type.isBomber) {
          let flashInterval = 150;
          if (e.isPrimed) {
            const progress = Math.min((e.primedTimer || 0) / 2000, 1);
            flashInterval = 150 - progress * 110; // speeds up from 150ms down to 40ms!
          }
          const frame = Math.floor(Date.now() / flashInterval) % BOMBER_SPRITES.length;
          if (e.animFrame !== frame) {
            e.animFrame = frame;
            if (e.el) e.el.src = BOMBER_SPRITES[frame];
          }
          
          const cx = e.x + eSize / 2;
          const cy = e.y + eSize / 2;
          const distToPlayer = Math.hypot(px - cx, py - cy);

          // Once within 300px, prime the explosion!
          if (distToPlayer <= 300 && !e.isPrimed) {
            e.isPrimed = true;
            e.primedTimer = 0;
            this.playSound(SOUNDS.BOMBER_FUSE);
          }

          if (e.isPrimed) {
            e.primedTimer = (e.primedTimer || 0) + dt;
            if (e.primedTimer >= 2000) {
              this.explodeBomber(e);
              continue;
            }
          }
        }
        if (e.type.isMimic && e.el) {
          e.el.src = this.getEnemySprite(e);
          e.el.style.width = eSize + 'px';
          // FIXED: Flashes translucent when mimic is in hits-cooldown state
          const inCooldown = Date.now() - (e.lastHitTime || 0) < HIT_COOLDOWN;
          e.el.style.opacity = inCooldown ? (Math.floor(Date.now() / 100) % 2 === 0 ? '0.3' : '0.8') : '1.0';
        }
        if (e.el) {
          if (e.type.isBomber && e.isPrimed && e.primedTimer !== undefined) {
            const progress = Math.min(e.primedTimer / 2000, 1);
            // Dynamic linear growth + rapid, high-frequency pulsation to simulate boiling/bubbling
            const scale = 1.0 + progress * 0.9 + Math.abs(Math.sin(e.primedTimer * 0.025)) * 0.25;
            const displaySize = eSize * scale;
            e.el.style.width = displaySize + 'px';
            const offset = (displaySize - eSize) / 2;
            e.el.style.left = Math.round(e.x - offset - s.cameraX) + 'px';
            e.el.style.top = Math.round(e.y - offset - s.cameraY) + 'px';
          } else {
            e.el.style.width = eSize + 'px';
            e.el.style.left = Math.round(e.x - s.cameraX) + 'px';
            e.el.style.top = Math.round(e.y - s.cameraY) + 'px';
          }
          const ecx = e.x + eSize / 2;
          const ecy = e.y + eSize / 2;
          const dxTotal = px - ecx, dyTotal = py - ecy;
          e.el.style.transform = `rotate(${Math.atan2(dyTotal, dxTotal)}rad)`;

          const isHitFlashing = Date.now() - (e.lastDamageTime || 0) < 150;
          if (isHitFlashing) {
            e.el.style.filter = 'brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(15) brightness(1.8)';
          } else {
            e.el.style.filter = 'none';
          }
        }
        if (e.type.name === 'Magic Mob') {
          // FIXED: Both original and clones use e.shootInterval to slow down and match perfectly!
          if (!e.isClone && Date.now() - e.lastShot > (e.shootInterval || 2000)) {
            e.lastShot = Date.now();
            this.shootMagicBullet(e);
            e.shootInterval = 1800 + Math.random() * 2200;
          }
          if (e.isClone && !e.cloneAnimating && Date.now() - e.lastShot > (e.shootInterval || 2000)) {
            e.lastShot = Date.now();
            this.shootMagicBullet(e);
            e.shootInterval = 1800 + Math.random() * 2200;
          }
        } else {
          this.updateEnemyShooting(e);
        }
        if (this.isCollision(px, py, PLAYER_HITBOX_SIZE, e.x, e.y, eSize)) { this.takeDamage(e.isClone ? 'Magic Clone' : e.type.name); }
      } else {
        const dx = s.x - e.x, dy = s.y - e.y;
        const dist = Math.hypot(dx, dy) || 1;
        const enemySpeed = this.getEnemySpeed(e);
        e.x += (dx / dist) * enemySpeed;
        e.y += (dy / dist) * enemySpeed;

        if (!e.isUnloaded) {
          if (e.el) e.el.remove();
          this.clearEnemyShieldElements(e);
          e.isUnloaded = true;
        }
      }
    }
    this.animationId = requestAnimationFrame(this.update);
  }

  public _killEnemy(e: Enemy, j: number, source: string, bullet?: Bullet) {
    const s = this.state;
    const coinReward = e.type.coins;
    s.coins += coinReward;
    if (!s.mobKills) s.mobKills = {};
    s.mobKills[e.type.name] = (s.mobKills[e.type.name] || 0) + 1;
    this.triggerMissionEvent('kill_mob', 1, { mobType: e.type.name }); this.triggerMissionEvent('kill_any', 1); this.triggerMissionEvent('collect_coins', e.type.coins);
    if (s.multishot > 0) this.triggerMissionEvent('multishot_kill', 1);
    if (s.bulletPierce > 0 && source === 'bullet') this.triggerMissionEvent('pierce_kill', 1);
    this.emitState();

    // FIXED: Play quieter Fast Mob death sound!
    switch (e.type.name) {
      case 'Basic Mob': this.playMobSound(SOUNDS.KILL_BASIC, e.x, e.y, this.getEnemySize(e)); break;
      case 'Fast Mob': this.playMobSound(SOUNDS.KILL_FAST, e.x, e.y, this.getEnemySize(e), 0.25); break;
      case 'Big Mob': this.playMobSound(SOUNDS.KILL_BIG, e.x, e.y, this.getEnemySize(e)); break;
      case 'Beefy Mob': this.playMobSound(SOUNDS.KILL_BEEFY, e.x, e.y, this.getEnemySize(e)); break;
      case 'Magic Mob': this.playMobSound(SOUNDS.KILL_SHOOTER, e.x, e.y, this.getEnemySize(e)); break;
      case 'Shooter Mob': this.playMobSound(SOUNDS.KILL_SHOOTER, e.x, e.y, this.getEnemySize(e)); break;
      case 'Armored Mob': this.playMobSound(SOUNDS.KILL_ARMORED, e.x, e.y, this.getEnemySize(e)); break;
      case 'Mimic Mob': this.playMobSound(SOUNDS.KILL_MIMIC, e.x, e.y, this.getEnemySize(e)); break;
      case 'Bomber Mob':
        this.stopSound(SOUNDS.BOMBER_FUSE);
        this.playMobSound(SOUNDS.BOMBER_KILL, e.x, e.y, this.getEnemySize(e), 0.7);
        break;
    }
    if (e.type.name === 'Magic Mob' && !e.isClone) {
      s.enemies.forEach(enemy => {
        if (enemy.isClone && enemy.originalId === e.id) {
          if (enemy.el) enemy.el.remove();
        }
      });
      s.enemies = s.enemies.filter(enemy => !(enemy.isClone && enemy.originalId === e.id));
      if (bullet) { bullet.sessionKills = (bullet.sessionKills || 0) + 1; this.triggerMissionEvent('bullet_multikill', 1, { killCount: bullet.sessionKills }); }
    }
    this.clearEnemyShieldElements(e);
    if (e.el) e.el.remove();
    const actualIdx = s.enemies.indexOf(e);
    if (actualIdx !== -1) {
      s.enemies.splice(actualIdx, 1);
    }
  }

  public destroy() {
    cancelAnimationFrame(this.animationId);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('click', this.resumeMusic);
    document.removeEventListener('contextmenu', this.handleContextMenu, true);
    document.removeEventListener('dragstart', this.preventNativeDrag, true);
    document.removeEventListener('selectstart', this.preventNativeDrag, true);
    document.removeEventListener('wheel', this.preventBrowserZoom, true);
    document.removeEventListener('keydown', this.preventBrowserZoom, true);
    document.removeEventListener('gesturestart', this.preventBrowserZoom, true);
    document.removeEventListener('gesturechange', this.preventBrowserZoom, true);
    document.removeEventListener('gestureend', this.preventBrowserZoom, true);
    window.removeEventListener('blur', this.handleBlur);
    window.removeEventListener('resize', this.handleResize);
    clearTimeout(this.missionPopupTimer); clearTimeout(this.deathTimeout); clearTimeout(this.hitFlashTimeout);
    if (this.state.currentMusic) this.state.currentMusic.pause();
    if (this.state.shopMusic) this.state.shopMusic.pause();
    this.clearPhysicalShopItems();
    this.clearShieldElements();
    this.state.enemies.forEach(e => { this.clearEnemyShieldElements(e); if (e.el) e.el.remove(); });
    this.state.bullets.forEach(b => b.el.remove());
    this.state.enemyBullets.forEach(b => b.el.remove());
    this.state.explosions.forEach(ex => ex.el.remove());
    this.state.particles.forEach(p => p.el.remove());
    if (this.state.shopEntranceEl) this.state.shopEntranceEl.remove();
    if (this.state.shopExitEl) this.state.shopExitEl.remove();
    if (this.state.shopArrowEl) this.state.shopArrowEl.remove();
    if (this.state.shopArrowTextEl) this.state.shopArrowTextEl.remove();
    if (this.playerEl) this.playerEl.remove();
    if (this.testBoxEl) this.testBoxEl.remove();
  }

  public getCachedImage(url: string): HTMLImageElement {
    if (!this.textureCache[url]) {
      const img = new Image();
      img.referrerPolicy = "no-referrer";
      img.src = url;
      this.textureCache[url] = img;
    }
    return this.textureCache[url];
  }

  public preloadAllTextures() {
    // 1. Preload ground textures
    Object.values(BIOME_TEXTURES.ground).forEach(url => {
      this.getCachedImage(url);
    });

    // 2. Preload water animation frames
    BIOME_TEXTURES.waterAnimation.forEach(url => {
      this.getCachedImage(url);
    });

    // 3. Preload all transition overlays
    Object.values(BIOME_TEXTURES.transitions).forEach(transConfig => {
      Object.values(transConfig).forEach(val => {
        if (Array.isArray(val)) {
          val.forEach(url => this.getCachedImage(url));
        } else if (typeof val === 'string') {
          this.getCachedImage(val);
        }
      });
    });
  }

  private hash2d(x: number, y: number): number {
    const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
    return h - Math.floor(h);
  }

  private noise2d(x: number, y: number): number {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;

    const ux = fx * fx * (3.0 - 2.0 * fx);
    const uy = fy * fy * (3.0 - 2.0 * fy);

    const a = this.hash2d(ix, iy);
    const b = this.hash2d(ix + 1, iy);
    const c = this.hash2d(ix, iy + 1);
    const d = this.hash2d(ix + 1, iy + 1);

    return a * (1 - ux) * (1 - uy) +
           b * ux * (1 - uy) +
           c * (1 - ux) * uy +
           d * ux * uy;
  }

  private fbm(x: number, y: number, octaves = 3): number {
    let value = 0.0;
    let amplitude = 0.5;
    let frequency = 1.0;
    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise2d(x * frequency, y * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  public getHostBiomeAt(r: number, c: number): string {
    const temp = this.fbm(c * 0.005 + this.biomeSeedT, r * 0.005 + this.biomeSeedT, 2);
    const moist = this.fbm(c * 0.005 + this.biomeSeedM, r * 0.005 + this.biomeSeedM, 2);

    // temp and moist ranges are roughly [0, 0.85]
    if (temp < 0.18) { // lowered from 0.22 to expand warm/hot biomes
      return 'snow';
    } else if (temp < 0.35) { // lowered from 0.42 to expand warm/hot biomes
      if (moist < 0.30) {
        return 'stone';
      } else {
        return 'forest';
      }
    } else if (temp < 0.48) { // lowered from 0.58 to make high temp area even larger
      if (moist < 0.25) {
        return 'stone';
      } else if (moist < 0.55) {
        return 'grass';
      } else {
        return 'forest';
      }
    } else { // high temperature (starts at 0.48 instead of 0.58)
      if (moist < 0.36) { // raised from 0.26 to increase desert size significantly
        return 'desert';
      } else if (moist < 0.44) { // lowered from 0.50 to shrink grass and increase magma size significantly
        return 'grass';
      } else {
        return 'magma';
      }
    }
  }

  public getRawBiomeAt(r: number, c: number): string {
    const cacheKey = `${r}_${c}`;
    if (this.rawBiomeCache.has(cacheKey)) {
      return this.rawBiomeCache.get(cacheKey)!;
    }

    const host = this.getHostBiomeAt(r, c);

    // Lake noise determines if there is an enclosed lake - lake frequency of 0.04 as requested
    const lakeNoise = this.fbm(c * 0.04 + this.biomeSeedL, r * 0.04 + this.biomeSeedL, 2);

    let result = host;
    // Lower threshold specifically for snow biome to increase ice lake count and size
    const lakeThreshold = (host === 'snow') ? 0.52 : 0.62;
    if (lakeNoise > lakeThreshold) {
      // Check if neighbors within distance of 2 are also the same host to ensure it's completely enclosed
      const checkRange = 2;
      let isEnclosed = true;
      for (let dr = -checkRange; dr <= checkRange; dr += 2) {
        for (let dc = -checkRange; dc <= checkRange; dc += 2) {
          if (dr === 0 && dc === 0) continue;
          if (this.getHostBiomeAt(r + dr, c + dc) !== host) {
            isEnclosed = false;
            break;
          }
        }
        if (!isEnclosed) break;
      }

      if (isEnclosed) {
        if (host === 'snow') {
          result = 'ice';
        } else if (host === 'magma') {
          result = 'lava';
        } else if (host === 'grass' || host === 'forest' || host === 'desert') {
          result = 'water';
        }
      }
    }

    this.rawBiomeCache.set(cacheKey, result);
    return result;
  }

  public getBiomeAt(r: number, c: number): string {
    const cacheKey = `${r}_${c}`;
    if (this.biomeCache.has(cacheKey)) {
      return this.biomeCache.get(cacheKey)!;
    }

    // To prevent 3 or more biomes from intersecting in any grid, and to ensure a minimum biome size,
    // we resolve biomes at the aligned 4x4 block level.
    const br = Math.floor(r / 4) * 4;
    const bc = Math.floor(c / 4) * 4;

    const counts: Record<string, number> = {};
    for (let dr = 0; dr < 4; dr++) {
      for (let dc = 0; dc < 4; dc++) {
        const b = this.getRawBiomeAt(br + dr, bc + dc);
        counts[b] = (counts[b] || 0) + 1;
      }
    }

    const uniqueBiomes = Object.keys(counts);

    let resolved: string;
    if (uniqueBiomes.length <= 2) {
      resolved = this.getRawBiomeAt(r, c);
    } else {
      // Sort by frequency descending, then alphabetically for determinism
      const sortedBiomes = uniqueBiomes.sort((a, b) => {
        if (counts[b] !== counts[a]) {
          return counts[b] - counts[a];
        }
        return a.localeCompare(b);
      });

      const allowed = new Set([sortedBiomes[0], sortedBiomes[1]]);
      const raw = this.getRawBiomeAt(r, c);

      if (allowed.has(raw)) {
        resolved = raw;
      } else {
        resolved = sortedBiomes[0];
      }
    }

    this.biomeCache.set(cacheKey, resolved);
    return resolved;
  }

  public findSafeSpawnPosition(): { x: number; y: number } {
    // Start searching from tile near (900, 400)
    const startTileC = Math.floor(900 / this.tileSize);
    const startTileR = Math.floor(400 / this.tileSize);

    // Spiral / search outwards
    for (let radius = 0; radius < 100; radius++) {
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          if (Math.abs(dr) !== radius && Math.abs(dc) !== radius) continue;
          const r = startTileR + dr;
          const c = startTileC + dc;
          const biome = this.getBiomeAt(r, c);
          if (biome === 'grass' || biome === 'forest') {
            return {
              x: c * this.tileSize + this.tileSize / 2,
              y: r * this.tileSize + this.tileSize / 2
            };
          }
        }
      }
    }
    return { x: 900, y: 400 };
  }

  public generateBiomes() {
    this.biomeCache.clear();
    this.rawBiomeCache.clear();
    this.biomeSeedT = Math.random() * 10000;
    this.biomeSeedM = Math.random() * 10000;
    this.biomeSeedL = Math.random() * 10000;
  }

  public getTransitionOverlay(r: number, c: number, A: string, frame: number): { url: string; anim: boolean } | null {
    // Check neighbors for any overlay biome B that A has a transition to
    const neighbors = [
      { dr: -1, dc: 0 },  // Top
      { dr: 1, dc: 0 },   // Bottom
      { dr: 0, dc: -1 },  // Left
      { dr: 0, dc: 1 },   // Right
      { dr: -1, dc: -1 }, // Top-Left
      { dr: -1, dc: 1 },  // Top-Right
      { dr: 1, dc: -1 },  // Bottom-Left
      { dr: 1, dc: 1 }    // Bottom-Right
    ];

    const getTile = (row: number, col: number) => {
      return this.getBiomeAt(row, col);
    };

    // Find if there is a neighbor B that has an A_B transition
    let targetB = '';
    let transConfig: any = null;

    for (const n of neighbors) {
      const b = getTile(r + n.dr, c + n.dc);
      if (!b || b === A) continue;
      
      let key = `${A}_${b}`;
      let config = BIOME_TEXTURES.transitions[key];

      // Fallback for water transition if direct A_water is not defined (e.g., stone_water, snow_water)
      if (!config && b === 'water') {
        config = BIOME_TEXTURES.transitions['grass_water'];
        key = `grass_water`;
      }

      // Fallback for lava transition if direct A_lava is not defined
      if (!config && b === 'lava') {
        config = BIOME_TEXTURES.transitions['magma_lava'];
        key = `magma_lava`;
      }

      // Fallback for ice transition if direct A_ice is not defined
      if (!config && b === 'ice') {
        config = BIOME_TEXTURES.transitions['snow_ice'];
        key = `snow_ice`;
      }

      if (config) {
        targetB = b;
        transConfig = config;
        break; // Only one transition type can exist per tile due to boundary layout
      }
    }

    if (!transConfig || !targetB) return null;

    // Determine 12-way transition key - inverted because asset sprite definitions are the opposite of the grid neighbor check
    const t = getTile(r - 1, c) === targetB;
    const b = getTile(r + 1, c) === targetB;
    const l = getTile(r, c - 1) === targetB;
    const r_ = getTile(r, c + 1) === targetB;

    let subKey = '';

    // 1. Double cardinal (inner corners) - Inverted to match asset orientation
    if (t && l) subKey = 'innerBottomRight';
    else if (t && r_) subKey = 'innerBottomLeft';
    else if (b && l) subKey = 'innerTopRight';
    else if (b && r_) subKey = 'innerTopLeft';
    // 2. Single cardinal (edges) - Inverted to match asset orientation
    else if (t) subKey = 'bottom';
    else if (b) subKey = 'top';
    else if (l) subKey = 'right';
    else if (r_) subKey = 'left';
    // 3. Diagonal (outer corners) - Inverted to match asset orientation
    else {
      const tl = getTile(r - 1, c - 1) === targetB;
      const tr = getTile(r - 1, c + 1) === targetB;
      const bl = getTile(r + 1, c - 1) === targetB;
      const br = getTile(r + 1, c + 1) === targetB;

      if (tl) subKey = 'outerBottomRight';
      else if (tr) subKey = 'outerBottomLeft';
      else if (bl) subKey = 'outerTopRight';
      else if (br) subKey = 'outerTopLeft';
    }

    if (!subKey || !transConfig[subKey]) return null;

    const val = transConfig[subKey];
    if (Array.isArray(val)) {
      // Animated water transition: index frame based on the precomputed drawBiomes frame and global offsets
      const waterAnimOffset = this.state.waterAnimOffset;
      const waterRestOffset = parseInt(localStorage.getItem('waterRestOffset') || '3', 10);
      const isSide = subKey === 'left' || subKey === 'right';
      const offset = isSide ? waterAnimOffset : (waterAnimOffset + waterRestOffset);
      const targetFrame = (frame + offset) % val.length;
      return { url: val[targetFrame], anim: true };
    } else {
      return { url: val as string, anim: false };
    }
  }

  public drawBiomes() {
    if (!this.bgCtx || !this.bgCanvas) return;
    const s = this.state;
    const ctx = this.bgCtx;
    const canvas = this.bgCanvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cameraX = Math.round(s.cameraX);
    const cameraY = Math.round(s.cameraY);
    const viewWidth = canvas.width;
    const viewHeight = canvas.height;

    const startCol = Math.floor(cameraX / this.tileSize);
    const endCol = Math.floor((cameraX + viewWidth) / this.tileSize);
    const startRow = Math.floor(cameraY / this.tileSize);
    const endRow = Math.floor((cameraY + viewHeight) / this.tileSize);

    const frame = Math.floor(Date.now() / 75) % 9;

    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const tileType = this.getBiomeAt(r, c);
        
        let imgUrl = BIOME_TEXTURES.ground[tileType as keyof typeof BIOME_TEXTURES.ground];
        
        // Animated water frames - synchronized with frame offset
        if (tileType === 'water') {
          const waterFrame = (frame + s.waterAnimOffset) % 9;
          imgUrl = BIOME_TEXTURES.waterAnimation[waterFrame];
        }

        if (imgUrl) {
          const img = this.getCachedImage(imgUrl);
          if (img.complete && img.naturalWidth !== 0) {
            const drawX = c * this.tileSize - cameraX;
            const drawY = r * this.tileSize - cameraY;
            ctx.drawImage(img, drawX, drawY, this.tileSize, this.tileSize);
          }
        }

        // Animated or static transition overlays
        const overlay = this.getTransitionOverlay(r, c, tileType, frame);
        if (overlay) {
          const img = this.getCachedImage(overlay.url);
          if (img.complete && img.naturalWidth !== 0) {
            const drawX = c * this.tileSize - cameraX;
            const drawY = r * this.tileSize - cameraY;
            ctx.drawImage(img, drawX, drawY, this.tileSize, this.tileSize);
          }
        }
      }
    }
  }
}
