#!/bin/bash

echo
echo 'Run test at module'
echo

cd ../../module/dev

if npm run test; then

    echo
    echo 'Tests at module were passed'
    echo 'Run test at visitor'
    echo

    cd ../../visitor/dev

    if npm run test; then

        echo
        echo 'Tests at visitor were passed'
        echo 'Building project...'
        echo

        if npm run build; then

            echo
            echo 'Building project is done.'
            echo 'Building moz-ie version project...'
            echo

            if npm run build-moz_ie; then

                echo
                echo "Building is success. Exit?"
                select yn in "Yes"; do
                    case $yn in
                        Yes ) exit;;
                    esac
                done

             else

                 echo
                 echo "Building moz-ie version project is failed. Exit?"
                 select yn in "Yes"; do
                     case $yn in
                         Yes ) exit;;
                     esac
                 done

             fi

        else

            echo
            echo "Building project is failed. Exit?"
            select yn in "Yes"; do
                case $yn in
                    Yes ) exit;;
                esac
            done

        fi

    else

        echo
        echo "Test at visitor was not passed. Exit?"
        select yn in "Yes"; do
            case $yn in
                Yes ) exit;;
            esac
        done

    fi

else

    echo
    echo "Test at module was not passed. Exit?"
    select yn in "Yes"; do
        case $yn in
            Yes ) exit;;
        esac
    done

fi
