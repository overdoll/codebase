/**
 * @generated SignedSource<<718c7f80034eb3883ac42b01e410a258>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeTopicBannerFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicBannerFormFragment">;
  readonly " $fragmentType": "ChangeTopicBannerFragment";
};
export type ChangeTopicBannerFragment$key = {
  readonly " $data"?: ChangeTopicBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeTopicBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "banner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeTopicBannerFormFragment"
    }
  ],
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "bb49b51cb0f3bc12fc1e1026f7b23eed";

export default node;
