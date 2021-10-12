import EditorContainer from '@src/components/EditorContainer'

export default function Editor() {
  return <EditorContainer />
}

export async function getStaticPaths() {
  const paths = [{ params: { id: '1' } }]
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({}) {
  return {
    props: {},
  }
}
