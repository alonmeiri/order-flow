import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Button, TextField, List, ListItem } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const Settings = inject("ordersStore")(
  observer(props => {
    const [name, setName] = useState("");
    const [employee, setEmployee] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [shopName, setShopName] = useState("");
    const [password, setPassword] = useState("");
    const [synced, setSynced] = useState(
      props.ordersStore.products.length > 0 ? true : false
    );
    const handleNameChange = e => {
      setName(e.target.value);
    };
    const handleChange = e => {
      e.target.name === "apiKey"
        ? setApiKey(e.target.value)
        : e.target.name === "password"
        ? setPassword(e.target.value)
        : setShopName(e.target.value);
    };

    const addEmployee = () => {
      props.ordersStore.addEmployee(name);
      setName("");
    };
    const modifyEmployee = () => {
      props.ordersStore.modifyEmployee(employee);
      setEmployee("");
    };
    const makeSync = async () => {
      const isSuccessfull = await props.ordersStore.makeSync({
        apiKey,
        password,
        shopName
      });
      isSuccessfull ? setSynced(true) : alert("sync failed");
      setApiKey("");
      setPassword("");
      setShopName("");
    };

    return (
      <div id="settings-page">
        <div className="employees-settings">
          <List>
            <ListItem>
              <TextField
                label="Add mame"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
              />
              <Button onClick={addEmployee} variant="contained" color="primary">
                Add employee
              </Button>
            </ListItem>
            <ListItem>
              <Autocomplete
                onChange={(e, v) => setEmployee(v)}
                options={props.ordersStore.employees.filter(e => e.isActive)}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Select Employee" />
                )}
              />
              <Button
                onClick={modifyEmployee}
                variant="contained"
                color="primary"
              >
                remove from roster
              </Button>
            </ListItem>
            <ListItem>
              <Autocomplete
                onChange={(e, v) => setEmployee(v)}
                options={props.ordersStore.employees.filter(e => !e.isActive)}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Select inActive Employee" />
                )}
              />
              <Button
                onClick={modifyEmployee}
                variant="contained"
                color="primary"
              >
                add to roster
              </Button>
            </ListItem>
          </List>
        </div>
        <div className="sync-shop">
          {synced ? (
            <div>Store synced with system - you can re-sync if you wish</div>
          ) : null}
          <div>
            <div className="shop-details">
              <TextField
                name="apiKey"
                label="Add api key"
                variant="outlined"
                value={apiKey}
                onChange={handleChange}
              />
              <TextField
                name="password"
                label="Add password"
                variant="outlined"
                value={password}
                onChange={handleChange}
              />
              <TextField
                name="shopName"
                label="Add shop name"
                variant="outlined"
                value={shopName}
                onChange={handleChange}
              />
              <Button onClick={makeSync} variant="contained" color="primary">
                Sync With Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default Settings;