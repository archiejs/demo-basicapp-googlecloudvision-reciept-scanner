for i in ./modules/*/package.json;
do
  echo $i
  grep plugin $i -A10  | grep directories -B10 | grep -v directories;
done
