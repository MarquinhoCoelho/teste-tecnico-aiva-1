import { useCallback } from 'react'
import useDarkMode from '@/utils/hooks/useDarkMode'
import Switcher from '@/components/ui/Switcher'
import { HiMoon, HiSun } from 'react-icons/hi'

const ModeSwitcher = () => {
    const [isDark, setIsDark] = useDarkMode()

    const onSwitchChange = useCallback(
        (checked: boolean) => {
            setIsDark(checked ? 'dark' : 'light')
        },
        [setIsDark],
    )

    return (
        <div className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {isDark ? (
                <>
                    <HiMoon className="text-yellow-300 w-5 h-5" />
                    <span className="font-semibold text-gray-100">Dark</span>
                </>
            ) : (
                <>
                    <HiSun className="text-yellow-500 w-5 h-5" />
                    <span className="font-semibold text-gray-700">Light</span>
                </>
            )}
            <Switcher
                defaultChecked={isDark}
                onChange={(checked) => onSwitchChange(checked)}
            />
        </div>
    )
}

export default ModeSwitcher
