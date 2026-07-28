npm install

npm test

node server.js

Reto 1
docker build -t <nombre-imagen> .

docker run -d -p <host>:<contenedor> --name <nombre> <imagen>

docker logs <nombre-contenedor>

docker exec -it <nombre-contenedor> sh

cat server.js

Reto 2
minikube start

minikube image load <imagen>:<tag>

kubectl apply -f <archivo.yml>

kubectl get pods

kubectl describe service <nombre>

kubectl get endpoints <nombre>

kubectl get service <nombre>

minikube service <nombre web>

curl.exe curl <URL_GENERADA>/health

curl http://localhost:8080/health


Reto4
PowerShell= while ($true) { try { Invoke-WebRequest http://127.0.0.1:50477/ -UseBasicParsing | Select-Object -ExpandProperty Content } catch { $_.Exception.Message }; Start-Sleep -Milliseconds 500 } 

kubectl rollout restart deployment/web-deployment

kubectl rollout status deployment/web-deployment