/**
 * @generated SignedSource<<82d318d4a4201fe645bea506c592f285>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateCharacterButtonFragment$data = {
  readonly characterRequests: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly characters: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly id: string;
  readonly " $fragmentType": "UpdateCharacterButtonFragment";
};
export type UpdateCharacterButtonFragment$key = {
  readonly " $data"?: UpdateCharacterButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateCharacterButtonFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdateCharacterButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CharacterRequest",
      "kind": "LinkedField",
      "name": "characterRequests",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "fb06f790271e63cafcd4a0afaf4d05ec";

export default node;
