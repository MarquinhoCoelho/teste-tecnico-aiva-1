import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import React, { useState, useEffect } from 'react'
import { HiPlus, HiX } from 'react-icons/hi'

interface AttributeSectionProps {
    onAddImageLink: (links: string[]) => void
    defaultImages?: string[]
}

const AttributeSection = ({ 
    onAddImageLink, 
    defaultImages = [],
}: AttributeSectionProps) => {
    const [imageLink, setImageLink] = useState('')
    const [previewImages, setPreviewImages] = useState<string[]>(defaultImages)

    useEffect(() => {
        setPreviewImages(defaultImages)
    }, [defaultImages])

    const handleAddImage = () => {
        const trimmedLink = imageLink.trim();
        const isValidUrl = /^https?:\/\/.+/i.test(trimmedLink);

        if (isValidUrl && !previewImages.includes(trimmedLink)) {
            const newImages = [...previewImages, trimmedLink];
            setPreviewImages(newImages);
            onAddImageLink(newImages);
            setImageLink('');
        }
    }

    const handleRemoveImage = (index: number) => {
        const newImages = previewImages.filter((_, i) => i !== index)
        setPreviewImages(newImages)
        onAddImageLink(newImages)
    }

    return (
        <Card className="p-6">
            <div className="mt-6">
                <FormItem label="Imagens do Produto">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Cole o link da imagem (ex: https://exemplo.com/imagem.jpg)"
                                value={imageLink}
                                onChange={e => setImageLink(e.target.value)}
                                className="flex-1"
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                                onClick={handleAddImage}
                            >
                                <HiPlus className="w-5 h-5" />
                                Adicionar
                            </button>
                        </div>

                        {previewImages.length > 0 && (
                            <div className="mt-4">
                                <h5 className="text-sm font-medium text-gray-700 mb-3">Imagens adicionadas:</h5>
                                <div className="grid grid-cols-2 gap-4">
                                    {previewImages.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                                <img
                                                    src={img}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <HiX className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </FormItem>
            </div>
        </Card>
    )
}

export default AttributeSection
