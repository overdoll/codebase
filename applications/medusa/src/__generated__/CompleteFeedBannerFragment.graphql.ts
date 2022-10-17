/**
 * @generated SignedSource<<29981472e4a154fa42593ebf84dd4e69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CompleteFeedBannerFragment$data = {
  readonly clubMembershipsCount: number;
  readonly curationProfile: {
    readonly audience: {
      readonly completed: boolean;
    };
  };
  readonly " $fragmentType": "CompleteFeedBannerFragment";
};
export type CompleteFeedBannerFragment$key = {
  readonly " $data"?: CompleteFeedBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CompleteFeedBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CompleteFeedBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CurationProfile",
      "kind": "LinkedField",
      "name": "curationProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AudienceCurationProfile",
          "kind": "LinkedField",
          "name": "audience",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "completed",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "da3f1f324dfe02d2b65e94f09d83e804";

export default node;
