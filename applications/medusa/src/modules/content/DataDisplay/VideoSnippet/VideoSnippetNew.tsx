export {}
// import { graphql } from 'react-relay/hooks'
// import { useFragment } from 'react-relay'
// import type { VideoSnippetFragment$key } from '@//:artifacts/VideoSnippetFragment.graphql'
// import NextImage from '../NextImage/NextImage'
// import { ImageProps } from 'next/image'
// import { Box } from '@chakra-ui/react'
// import { useHydrate } from '../../../hydrate'
//
// interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'> {
//   innerRef?: () => void
//   query: VideoSnippetFragment$key
// }
//
// const Fragment = graphql`
//   fragment VideoSnippetFragment on Resource {
//     videoThumbnail {
//       url
//     }
//     preview
//   }
// `
//
// export default function VideoSnippet ({
//   query,
//   ...rest
// }: Props): JSX.Element {
//   const data = useFragment(Fragment, query)
//
//   const isHydrated = useHydrate()
//
//   const previewBackground = data?.preview != null && data?.preview !== '' ? data?.preview : 'gray.800'
//
//   return (
//     <Box
//       w='100%'
//       h='100%'
//       display='block'
//       position='relative'
//       bg={previewBackground}
//     >
//       <NextImage
//         alt=''
//         loading={isHydrated ? 'lazy' : 'eager'}
//         style={{
//           backgroundColor: previewBackground,
//           userSelect: 'none'
//         }}
//         src={data?.videoThumbnail?.url ?? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
//         {...rest}
//       />
//     </Box>
//   )
// }