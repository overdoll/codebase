/**
 * @generated SignedSource<<fe226c429375bfc979bfc325754f8e6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubCharacterRichObjectFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"MediaRichObjectFragment">;
  } | null;
  readonly club: {
    readonly name: string;
    readonly slug: string;
  };
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "PublicClubCharacterRichObjectFragment";
};
export type PublicClubCharacterRichObjectFragment$key = {
  readonly " $data"?: PublicClubCharacterRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubCharacterRichObjectFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
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
  "name": "PublicClubCharacterRichObjectFragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "club"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "bannerMedia",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MediaRichObjectFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "cb5cf1215f08735410340f0571b318eb";

export default node;
