module.exports = {
  apps: [{
    name: "Hack-Healthy-Recipes",
    script: "./bin/www",
    env: {
      S3_BUCKET: "YOURS3BUCKET",
      SECRET_KEY: "SECRET_KEY_TOKEN_JWT",

      FAT_SECRET_CLIENT_ID: '94b8e95327804bb48292a063065635c3',
      FAT_SECRET_CLIENT_SECRET: '16ddddaacd2341e187522a12f957892e',

      OPEN_AI_API_KEY: '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',

      GEMINI_API_KEY: 'AIzaSyA3MoS-FOFzCObqy8TIJlXwdw5xYfMbIAo',

      MIDTRANS_MERCHANT_ID: 'G180284583',
      MIDTRANS_SERVER_KEY: 'SB-Mid-server-e2INi_Gybdx2nW6ZIPwz51Ao',
      MIDTRANS_CLIENT_KEY: 'SB-Mid-client-SjCH_r-lyThi3-xm',

      DB_SUPABASE_PASSWORD: '9i2caCDF6Aiz5c0z',
      DATABASE_URL: 'postgresql://postgres.epqmtftiwyidiljmkvjq:9i2caCDF6Aiz5c0z@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',

      GOOGLE_CLIENT_ID: "983383379443-icooqvrf2s1lfgng04dr1430gnlt6ej2.apps.googleusercontent.com",
      PORT: 80,
	NODE_ENV:"production"
    }
  }]
}

