import {useNavigate} from "react-router-dom"
import {BackButton} from "@vkruglikov/react-telegram-web-app"

// A button component that allows the user to navigate back to the previous page.
function ReturnButton() {
    const navigate = useNavigate()
    return (
        <BackButton onClick={() => navigate(-1)}/>
    )
}

export default ReturnButton