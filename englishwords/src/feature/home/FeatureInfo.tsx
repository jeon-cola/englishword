interface FeatureInfoProps {
  title: string,
  content: string,
  image: "test" | "word" | "template"
}

const FeatureInfo: React.FC<FeatureInfoProps> = ({title, content, image}) => {
  return (
    <div className="flex w-[800px]">
      <img src={image} alt={`${image} 이미지`} />

      <div className="flex flex-col gap -2">
        <p className="font-bold text-4xl">{title}</p>

        <p>{content}</p>
      </div>
    </div>
  )
}

export default FeatureInfo