modules=$(find * | grep package.json | grep -v node_modules | sed "s:package.json::g")

# install in root
#
echo installing packages in root
npm install

# install at other places where we find package.json
#
for dir in $modules; do
  echo installing packages in $dir
  (
    cd $dir; 
    npm install; 
  )
done
