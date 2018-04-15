# CI Demo {#setup-guide}

Based on previous information we have provided,  we have talked about how to [install](/deploy-on-server.md), customize nosmoke testing via [hooks](/2. hook-templates.md) and [configuration](/3. configuration-parameters.md) files and nosmoke [command line tools](/0. Setup.md). Here is the last step in the series of documents, where you can see how a living CI instance of NoSmoke is scripted.

#### 1.Example: 

```bash
source ~/.zshrc

echo "#0 clean server process"
lsof -P | grep ':3554' | awk '{print $2}' | xargs kill -9
lsof -P | grep ':3564' | awk '{print $2}' | xargs kill -9

sleep 5

echo "#1 initiate macaca server"

macaca server --verbose -p 3554 &

sleep 5

echo "#2 initiate nosmoke"

nosmoke -s -c /Users/jenkins/chenghuai/hkwalletnosmoke/HK-Wallet-Config/crawler.config-android.yml \
        -h /Users/jenkins/chenghuai/hkwalletnosmoke/HK-Wallet-Config/hooks-android.js \
        --server http://localhost:3554 \
        -p 3564

```

After this is executed, the report file will be generated at the dir where the script has been executed.

![](/assets/generated_output.png)

