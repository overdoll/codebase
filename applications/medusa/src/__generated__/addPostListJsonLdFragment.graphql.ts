/**
 * @generated SignedSource<<15312daff6dcb9e730079c8a3a8ba66b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type addPostListJsonLdFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly name: string;
  }>;
  readonly club: {
    readonly name: string;
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentType": "addPostListJsonLdFragment";
};
export type addPostListJsonLdFragment$key = {
  readonly " $data"?: addPostListJsonLdFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"addPostListJsonLdFragment">;
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
  "name": "addPostListJsonLdFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        (v0/*: any*/)
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
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "5a72df389dc24be061a29d39b8113c9a";

export default node;
