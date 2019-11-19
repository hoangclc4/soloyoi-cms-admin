export function getEnvParams () {
  const env = process.env.NODE_ENV;
  if (env === 'develop') {
    return {
      uri: 'http://ec2-13-230-167-168.ap-northeast-1.compute.amazonaws.com/graphql'
    }
  } else {
    return {
      uri: 'http://localhost:3001/graphql'
    }
  }

}