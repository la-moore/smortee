export function reader(data): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.readAsText(data)

    reader.addEventListener('loadend', function(e){
      resolve(e.target.result.toString())
    })
  })
}
