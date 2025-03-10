export const validatePassword = (password, confirmPassword) => {
    if (password.length < 11) {
        return "Password must be at least 11 characters long";
    }
    if (!isNaN(password)) {
        return "Password cannot be entirely numeric";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }
    return null;
};

export const registerUser = async (formData) => {
    const nameParts = formData.fullName.trim().split(" ");
    if (nameParts.length < 2) {
        return { error: "Please enter both first and last name." };
    }
    
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    try {
        const response = await fetch("http://127.0.0.1:8000/volunteer/create_volunteer/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: formData.email,
                password: formData.password,
                gender: formData.gender,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: "Account created successfully!", data };
        } else {
            const errorData = await response.json();
            return { error: errorData.email ? "The email has already been used." : "Something went wrong. Please try again." };
        }
    } catch (error) {
        console.error("Error:", error);
        return { error: "Something went wrong. Please try again." };
    }
};
