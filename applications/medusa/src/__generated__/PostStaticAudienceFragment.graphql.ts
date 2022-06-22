/**
 * @generated SignedSource<<3ee97b0265b5a74b43b6bacd7f1bc12a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostStaticAudienceFragment$data = {
  readonly audience: {
    readonly title: string;
  } | null;
  readonly " $fragmentType": "PostStaticAudienceFragment";
};
export type PostStaticAudienceFragment$key = {
  readonly " $data"?: PostStaticAudienceFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticAudienceFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStaticAudienceFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
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
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "75afacb1f738f46db46192098d7d0ecd";

export default node;
