import { useCallback, useEffect, useState } from 'react'

/**
 * A React hook to manage state that is persisted in localStorage and
 * synchronized across browser tabs. Assumes a client-only environment.
 *
 * @param key The key to use in localStorage.
 * @param defaultValueFn A function that returns the default value. This is
 *   lazily evaluated only when the key is not found in localStorage.
 * @returns A state and setter tuple, similar to `useState`.
 */
export function useLocalStorageState<T>(
    key: string,
    defaultValueFn: () => T,
): [T, (newValue: T | ((prev: T) => T)) => void] {
    // State is initialized lazily from localStorage or the default value function.
    // This function only runs on the initial render.
    const [state, setState] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            if (item) {
                return JSON.parse(item) as T
            }
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error)
        }
        // If no item is found or parsing fails, use the default value.
        return defaultValueFn()
    })

    // This effect persists the state to localStorage whenever it changes.
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(state))
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, state])

    // This effect listens for changes in other tabs and updates the state.
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            // Check if the change was for the key this hook is managing.
            if (event.key === key) {
                if (event.newValue) {
                    try {
                        // Update the state with the new value from the other tab.
                        setState(JSON.parse(event.newValue) as T)
                    } catch (error) {
                        console.error(
                            `Error parsing storage event value for key "${key}":`,
                            error,
                        )
                    }
                } else {
                    // The key was removed from localStorage in another tab.
                    // Revert to the default value.
                    setState(defaultValueFn())
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)

        // Cleanup the event listener when the component unmounts.
        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [key, defaultValueFn])

    // The returned setter function is memoized with useCallback to ensure
    // it has a stable identity, preventing unnecessary re-renders in child
    // components that depend on it.
    const setLocalStorageState = useCallback(
        (newValue: T | ((prev: T) => T)) => {
            setState(newValue)
        },
        [],
    )

    return [state, setLocalStorageState]
}
