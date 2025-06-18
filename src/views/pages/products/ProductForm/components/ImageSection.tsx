import Card from '@/components/ui/Card'
import Upload from '@/components/ui/Upload'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { PiImagesThin } from 'react-icons/pi'
import type { FormSectionBaseProps } from '../types'

const ImageSection = ({ control, errors }: FormSectionBaseProps) => {
    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true
        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 500000
        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot be more than 500kb!'
                }
            }
        }
        return valid
    }

    const handleUpload = async (
        onChange: (images: string[]) => void,
        originalImageList: string[] = [],
        files: File[],
    ) => {
        const newImages = await Promise.all(
            files.map(async (file) => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        resolve(reader.result as string)
                    }
                    reader.readAsDataURL(file)
                })
            })
        )
        const allImages = [...(originalImageList || []), ...newImages]
        const uniqueImages = Array.from(new Set(allImages))
        onChange(uniqueImages)
    }

    return (
        <Card>
            <h4 className="mb-2">Product Image</h4>
            <FormItem
                invalid={Boolean(errors.images)}
                errorMessage={errors.images?.message}
            >
                <Controller
                    name="images"
                    control={control}
                    render={({ field }) => (
                        <Upload
                            draggable
                            beforeUpload={beforeUpload}
                            showList={true}
                            onChange={files =>
                                handleUpload(field.onChange, field.value, files)
                            }
                        >
                            <div className="max-w-full flex flex-col px-4 py-8 justify-center items-center">
                                <div className="text-[60px]">
                                    <PiImagesThin />
                                </div>
                                <p className="flex flex-col items-center mt-2">
                                    <span className="text-gray-800 dark:text-white">
                                        Drop your image here, or{' '}
                                    </span>
                                    <span className="text-primary">
                                        Click to browse
                                    </span>
                                </p>
                            </div>
                        </Upload>
                    )}
                />
            </FormItem>
            <p>
                Image formats: .jpg, .jpeg, .png, preferred size: 1:1, file size is restricted to a maximum of 500kb.
            </p>
        </Card>
    )
}

export default ImageSection
