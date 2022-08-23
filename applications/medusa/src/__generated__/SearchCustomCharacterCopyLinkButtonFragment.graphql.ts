/**
 * @generated SignedSource<<cabf9ff4f761648576c149e8a54fcb47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCustomCharacterCopyLinkButtonFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly slug: string;
  readonly " $fragmentType": "SearchCustomCharacterCopyLinkButtonFragment";
};
export type SearchCustomCharacterCopyLinkButtonFragment$key = {
  readonly " $data"?: SearchCustomCharacterCopyLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCustomCharacterCopyLinkButtonFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCustomCharacterCopyLinkButtonFragment",
  "selections": [
    (v0/*: any*/),
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "club"
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "99720c7dac3e8a014b25631a0c82e519";

export default node;
