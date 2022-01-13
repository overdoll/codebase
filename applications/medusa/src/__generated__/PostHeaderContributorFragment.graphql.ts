/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostHeaderContributorFragment = {
    readonly contributor: {
        readonly username: string;
        readonly avatar: {
            readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
        } | null;
    };
    readonly " $refType": "PostHeaderContributorFragment";
};
export type PostHeaderContributorFragment$data = PostHeaderContributorFragment;
export type PostHeaderContributorFragment$key = {
    readonly " $data"?: PostHeaderContributorFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostHeaderContributorFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderContributorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "contributor",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "avatar",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ResourceIconFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '6ce00e7b6bf0764fe0b8a7989c8e2631';
export default node;
