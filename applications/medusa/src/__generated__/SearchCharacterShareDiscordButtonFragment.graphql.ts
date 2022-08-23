/**
 * @generated SignedSource<<4acf3ab9fbe51e39d07fbf742b35726a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCharacterShareDiscordButtonFragment$data = {
  readonly name: string;
  readonly series: {
    readonly slug: string;
    readonly title: string;
  };
  readonly slug: string;
  readonly " $fragmentType": "SearchCharacterShareDiscordButtonFragment";
};
export type SearchCharacterShareDiscordButtonFragment$key = {
  readonly " $data"?: SearchCharacterShareDiscordButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharacterShareDiscordButtonFragment">;
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
  "name": "SearchCharacterShareDiscordButtonFragment",
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

(node as any).hash = "2df8bf0909df037171a465913f1ae777";

export default node;
