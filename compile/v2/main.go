package main

import (
	bal "github.com/bali-nebula/go-component-framework/v2/bali"
	osx "os"
)

// MAIN PROGRAM

func main() {
	// Validate the commandline arguments.
	if len(osx.Args) < 2 {
		panic("compile <source file>")
	}
	var filename = osx.Args[1]

	// Read in the grammar file.
	var bytes, err = osx.ReadFile(filename)
	if err != nil {
		panic(err)
	}

	// Parse and validate the source file.
	var document = bal.ParseDocument(bytes)

	// Format the source file.
	bytes = bal.FormatDocument(document)

	// Write out the formatted file.
	err = osx.WriteFile(filename, bytes, 0644)
	if err != nil {
		panic(err)
	}
}
