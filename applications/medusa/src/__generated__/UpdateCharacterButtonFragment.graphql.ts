/**
 * @generated SignedSource<<65969a669a11d8f2a0d8dfa9e03707a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateCharacterButtonFragment$data = {
  readonly id: string;
  readonly characters: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly " $fragmentType": "UpdateCharacterButtonFragment";
};
export type UpdateCharacterButtonFragment = UpdateCharacterButtonFragment$data;
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "1660c4ad3a45b27c61077ff7107034b8";

export default node;
