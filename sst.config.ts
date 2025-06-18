/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "sst-nextjs",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
        },
      },
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("MyBucket", {
      access: "public",
    });
    const auth = new sst.aws.Auth("MyAuth", {
      issuer: "auth/index.handler",
    });
    new sst.aws.Nextjs("MyWeb", {
      link: [bucket,auth],
    });
  },
});
