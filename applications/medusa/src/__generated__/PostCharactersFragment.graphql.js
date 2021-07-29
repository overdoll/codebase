/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostCharactersFragment$ref: FragmentReference;
declare export opaque type PostCharactersFragment$fragmentType: PostCharactersFragment$ref;
export type PostCharactersFragment = {|
  +characterRequests: ?$ReadOnlyArray<{|
    +name: string,
    +media: string,
  |}>,
  +characters: $ReadOnlyArray<{|
    +name: string,
    +media: {|
      +title: string
    |},
  |}>,
  +mediaRequests: ?$ReadOnlyArray<string>,
  +$refType: PostCharactersFragment$ref,
|};
export type PostCharactersFragment$data = PostCharactersFragment;
export type PostCharactersFragment$key = {
  +$data?: PostCharactersFragment$data,
  +$fragmentRefs: PostCharactersFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CharacterRequestType",
      "kind": "LinkedField",
      "name": "characterRequests",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "media",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Media",
          "kind": "LinkedField",
          "name": "media",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mediaRequests",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = 'afdbdcc628d6114bd5a867cbc248d738';
module.exports = node;
