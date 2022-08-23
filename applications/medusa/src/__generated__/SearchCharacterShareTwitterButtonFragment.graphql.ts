/**
 * @generated SignedSource<<5ac4f9e282d869a4968eaf8d4a47d1b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCharacterShareTwitterButtonFragment$data = {
  readonly name: string;
  readonly series: {
    readonly slug: string;
    readonly title: string;
  };
  readonly slug: string;
  readonly " $fragmentType": "SearchCharacterShareTwitterButtonFragment";
};
export type SearchCharacterShareTwitterButtonFragment$key = {
  readonly " $data"?: SearchCharacterShareTwitterButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharacterShareTwitterButtonFragment">;
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
  "name": "SearchCharacterShareTwitterButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
    },
    (v0/*: any*/)
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "9df7912d804b666eb334fb29e84d53fb";

export default node;
