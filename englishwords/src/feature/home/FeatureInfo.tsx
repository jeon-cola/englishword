interface FeatureInfoProps {
  title: string,
  content: string,
  image: string
}

const FeatureInfo: React.FC<FeatureInfoProps> = ({title, content, image}) => {
  return (
    <div className="flex ">
      <img src={image} alt={`${image} 이미지`} />

      <div>
        <p>{title}</p>

        <p>{content}</p>
      </div>
    </div>
  )
}

export default FeatureInfo