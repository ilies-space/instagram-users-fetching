import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';

export default function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsloadin] = useState(false);
  const [users, setUsers] = useState([]);

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#acdbdf'}}>
      <TextInput
        style={{
          borderWidth: 0.5,
          paddingHorizontal: 50,
          marginVertical: 5,
          borderRadius: 20,
          borderColor: 'gray',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: 35,
        }}
        placeholder={'Search by user name ... '}
        onChangeText={(value) => {
          setIsloadin(true);

          setUsers([]);
          fetch(
            'https://www.instagram.com/web/search/topsearch/?query=' + value,
          )
            .then((response) => response.json())
            .catch((Error) => alert(Error))
            .then((data) => {
              console.log(data.users);
              setUsers(data.users);
              setIsloadin(false);
            });
        }}
      />
      {isLoading ? (
        <View style={{}}>
          <ActivityIndicator />
          <Text>Searching ... </Text>
        </View>
      ) : (
        <View />
      )}

      <View style={{flex: 1, width: '100%'}}>
        <FlatList
          keyExtractor={(item) => {
            item.pk;
          }}
          data={users}
          renderItem={(item) => {
            const userInfo = item.item.user;
            return (
              <View
                style={{
                  backgroundColor: '#f0ece2',
                  marginBottom: 10,
                  padding: 10,
                  margin: 8,
                  borderRadius: 10,
                  // alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginHorizontal: 15}}>
                    <Image
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                      }}
                      source={{
                        uri: userInfo.profile_pic_url,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{fontWeight: 'bold'}}>
                      {userInfo.full_name}
                    </Text>
                    <Text style={{color: 'grey'}}>{userInfo.username}</Text>
                    {userInfo.is_private ? (
                      <Text style={{color: 'red'}}>private</Text>
                    ) : (
                      <Text style={{color: 'green'}}>public</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
