const SignUpForm = () => {
    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form action="">
                <label htmlFor="">Display Name</label>
                <input type="text" />
                <label htmlFor="">Email</label>
                <input type="email" />
                <label htmlFor="">Password</label>
                <input type="password" />
                <label htmlFor="">Confirm Password</label>
                <input type="password" />
            </form>
        </div>
    );
};

export default SignUpForm;