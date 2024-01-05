import React, { useEffect } from 'react'


const USER_REGEX = /^[a-zA-Z0-9]{3,20}$/
const PWD_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/

const NewUserForm = () => {

  const [addNewUser, {
    isLoading,
    isError,
    error,
    isSuccess,

  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [okPassword, setokPassword] = useState(false)
  const [ROLES, setROLES] = useState(["Employee"])

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }
    , [username])

  useEffect(() => {
    setokPassword(PWD_REGEX.test(password))
  }
    , [password])

    useEffect(() => {
      if(isSuccess) {
        setUsername('')
        setPassword('')
        setROLES(["Employee"])
        navigate('/dash/users')
      }
    }
      , [isSuccess, navigate])


      const handleUsernameChange = (e) => {
        setUsername(e.target.value)
      }

      const handlePasswordChange = (e) => {
        setPassword(e.target.value)
      }

      const handleRoleChange = (e) => {
        const values = Array.from(
          e.target.selectedOptions,
          (option) => option.value
        )
        setROLES(values)
      }

      const canSave = [roles.length, validUsername, okPassword].every(Boolean) && !isLoading

      const handleSave = async() => {
        if(canSave) {
          try {
            await addNewUser({ username, password, roles })
          } catch (err) {
            console.error(err)
          }
        }
      }

      const options = Object.values(ROLES).map((role) => (
        <option
         key={role}
         value={role}>
          {role}
        </option>
      ))

      const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    
    const content = (
      <>
          <p className={errClass}>{error?.data?.message}</p>

          <form className="form" onSubmit={handleSave}>
              <div className="form__title-row">
                  <h2>New User</h2>
                  <div className="form__action-buttons">
                      <button
                          className="icon-button"
                          title="Save"
                          disabled={!canSave}
                      >
                          <FontAwesomeIcon icon={faSave} />
                      </button>
                  </div>
              </div>
              <label className="form__label" htmlFor="username">
                  Username: <span className="nowrap">[3-20 letters]</span></label>
              <input
                  className={`form__input ${validUserClass}`}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  value={username}
                  onChange={handleUsernameChange}
              />

              <label className="form__label" htmlFor="password">
                  Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
              <input
                  className={`form__input ${validPwdClass}`}
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
              />

              <label className="form__label" htmlFor="roles">
                  ASSIGNED ROLES:</label>
              <select
                  id="roles"
                  name="roles"
                  className={`form__select ${validRolesClass}`}
                  multiple={true}
                  size="3"
                  value={roles}
                  onChange={handleRoleChange}
              >
                  {options}
              </select>

          </form>
      </>
  )


return content
}

export default NewUserForm