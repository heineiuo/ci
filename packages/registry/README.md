# Registry


## Auth

Auth from *youkuohao auth center* and only user have auth to registry. Registry server self do not provide create token feature.

When give a pull/push an image method from ci server to container server, ci server will use access_token from session to fetch image from registry server, and registry server will verify token from *youkuohao auth center*. 