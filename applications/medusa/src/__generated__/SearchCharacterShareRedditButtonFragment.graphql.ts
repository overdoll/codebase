/**
 * @generated SignedSource<<eb801c0e703c1e95906be09fd085b5f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCharacterShareRedditButtonFragment$data = {
  readonly name: string;
  readonly series: {
    readonly slug: string;
    readonly title: string;
  };
  readonly slug: string;
  readonly " $fragmentType": "SearchCharacterShareRedditButtonFragment";
};
export type SearchCharacterShareRedditButtonFragment$key = {
  readonly " $data"?: SearchCharacterShareRedditButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharacterShareRedditButtonFragment">;
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
  "name": "SearchCharacterShareRedditButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "Series",
        "kind": "LinkedField",
        "name": "series",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "series"
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "bf501f12fd08be65c4ed283271c4a748";

export default node;
